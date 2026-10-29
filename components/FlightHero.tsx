"use client";

import { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { CITIES } from "@/lib/data";

type Leg = { el: SVGPathElement; len: number; interp: (t: number) => [number, number] };

const N = CITIES.length;
const pad2 = (n: number) => String(n).padStart(2, "0");
const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function FlightHero() {
  useEffect(() => {
    const $ = (id: string) => document.getElementById(id) as HTMLElement;
    const cam = d3.select("#cam");

    let countries: Feature<Geometry>[] | null = null;
    let landFC: FeatureCollection<Geometry> | null = null;
    let proj: d3.GeoProjection | null = null;
    let legs: Leg[] = [];
    let pinEls: SVGGElement[] = [];
    let planeEl: SVGCircleElement;
    let glowEl: SVGCircleElement;
    let visitedEls: (Element | null)[] = [];
    let lastIdx = -1;
    let mx = 0;
    let my = 0;
    let raf = 0;
    let rt: ReturnType<typeof setTimeout>;

    function build() {
      const vw = innerWidth, vh = innerHeight;
      cam.selectAll("*").remove();
      proj = d3.geoNaturalEarth1().fitExtent([[vw * 0.03, vh * 0.12], [vw * 0.97, vh * 0.92]], { type: "Sphere" });
      const path = d3.geoPath(proj);
      cam.append("path").attr("class", "sphere").attr("d", path({ type: "Sphere" }));
      cam.append("path").attr("class", "grat").attr("d", path(d3.geoGraticule10()));
      const land = cam.append("g").selectAll("path").data(countries!).join("path").attr("class", "land").attr("d", path);
      visitedEls = CITIES.map((c) => land.filter((f) => d3.geoContains(f, c.ll)).node() as Element | null);
      const routes = cam.append("g").attr("id", "routes");
      const line = d3.line();
      legs = [];
      for (let i = 1; i < N; i++) {
        const interp = d3.geoInterpolate(CITIES[i - 1].ll, CITIES[i].ll) as (t: number) => [number, number];
        const d = line(d3.range(0, 1.0001, 1 / 64).map((t) => proj!(interp(t)) as [number, number]));
        routes.append("path").attr("class", "route-ghost").attr("d", d);
        const p = routes.append("path").attr("class", "route").attr("d", d).node() as SVGPathElement;
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
        legs.push({ el: p, len, interp });
      }
      pinEls = CITIES.map((c) => {
        const [x, y] = proj!(c.ll) as [number, number];
        const g = cam.append("g").attr("class", "pin-g").attr("transform", `translate(${x},${y})`);
        g.append("circle").attr("class", "halo").attr("r", 6).style("transform-box", "fill-box").style("transform-origin", "center");
        g.append("circle").attr("class", "pin").attr("r", 6);
        g.append("text").attr("class", "label").text(c.city);
        return g.node() as SVGGElement;
      });
      glowEl = cam.append("circle").attr("class", "plane-glow").node() as SVGCircleElement;
      planeEl = cam.append("circle").attr("class", "plane").node() as SVGCircleElement;
      update();
    }

    const mut = d3.geoProjectionMutator((t: number) => (x: number, y: number) => {
      const a = d3.geoOrthographicRaw(x, y), b = d3.geoNaturalEarth1Raw(x, y);
      return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
    }) as unknown as (t: number) => d3.GeoProjection;
    const mp = mut(0);
    const GRAT = d3.geoGraticule10();

    function drawGlobe(t: number, k: number, tx: number, ty: number, lam: number, phi: number) {
      mut(t);
      mp.scale(k).translate([tx, ty]).rotate([lam, phi]).clipAngle(t >= 0.999 ? null : 90 + t * 89.9);
      const path = d3.geoPath(mp);
      $("gSphere").setAttribute("d", path({ type: "Sphere" }) ?? "");
      $("gGrat").setAttribute("d", path(GRAT) ?? "");
      $("gLand").setAttribute("d", path(landFC!) ?? "");
      const at = $("gAtmo");
      at.setAttribute("cx", String(tx));
      at.setAttribute("cy", String(ty));
      at.setAttribute("r", String(k + 4));
      at.style.opacity = String(1 - Math.min(1, t * 3));
    }

    function update() {
      const vw = innerWidth, vh = innerHeight, narrow = vw < 760;
      const rect = $("flight").getBoundingClientRect();
      if (rect.bottom < 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - vh)));
      const seg = (a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

      const z = io(seg(0.11, 0.24));
      const R = 130, tagH = narrow ? 0 : 80;
      const hMax = Math.max(200, Math.min(narrow ? 290 : 370, vh - 74 - 30 - tagH - 24));
      const w0 = Math.min(Math.round(hMax * 1.5), Math.round(vw * (narrow ? 0.84 : 0.4))), h0 = Math.round(w0 / 1.5);
      const sx = narrow ? vw * 0.5 : vw * 0.76;
      const sy = narrow ? Math.max(vh * 0.32, 74 + h0 / 2 + 30) : 74 + 30 + h0 / 2 + Math.max(0, (vh - 74 - 30 - tagH - 24 - h0) * 0.4);
      const cx = lerp(sx, vw / 2, z), cy = lerp(sy, vh / 2, z);
      const w = lerp(w0, vw + 2 * R + 40, z), h = lerp(h0, vh + 2 * R + 40, z);
      const r = Math.min(R, w0 / 2);
      const L = cx - w / 2, T = cy - h / 2, tilt = 1 - z;
      $("winBox").style.cssText = `width:${w}px;height:${h}px;transform:translate(${L}px,${T}px) perspective(900px) rotateY(${mx * 14 * tilt}deg) rotateX(${-my * 10 * tilt}deg)`;
      $("win").style.borderRadius = r + "px";
      $("frame").style.borderRadius = $("frameShadow").style.borderRadius = r + 18 + "px";
      $("mapLayer").style.clipPath = z >= 1 ? "none" : `inset(${T}px ${vw - (L + w)}px ${vh - (T + h)}px ${L}px round ${r}px)`;
      $("winTag").style.opacity = String(1 - seg(0.02, 0.07));

      const cl = io(seg(0.03, 0.1)), op = io(seg(0.26, 0.34));
      $("lid").style.transform = `translateY(${-102 + cl * 102 - op * 102}%)`;
      $("photo").style.opacity = cl >= 1 ? "0" : "1";
      $("winBox").style.visibility = op >= 1 ? "hidden" : "visible";

      const mt = io(seg(0.4, 0.48));
      if (landFC && proj) {
        const Rg = Math.min(w * 0.42, Math.min(vw, vh) * 0.42);
        const fk = proj.scale(), [ftx, fty] = proj.translate();
        const lam = (80 - p * 300) * (1 - mt), phi = -18 * (1 - mt);
        const gs = 0.1 + 0.9 * io(seg(0.28, 0.38));
        if (mt < 1) drawGlobe(mt, lerp(Rg * gs, fk, mt), lerp(cx, ftx, mt), lerp(cy, fty, mt), lam, phi);
        $("globe").style.display = mt < 1 ? "" : "none";
        $("cam").style.display = mt < 1 ? "none" : "";
      }

      const sky = $("sky");
      sky.style.transformOrigin = `${sx}px ${sy}px`;
      sky.style.transform = `scale(${1 + z * 0.8}) translate(${mx * -10}px,${my * -10}px)`;
      const hc = seg(0.04, 0.12);
      const hero = $("heroCard");
      hero.style.opacity = String(1 - hc);
      hero.style.pointerEvents = hc > 0.5 ? "none" : "auto";
      hero.style.transform = `translateY(${hc * 40}px) perspective(900px) rotateX(${hc * 12}deg)`;
      $("cue").style.opacity = String(1 - seg(0, 0.03));

      if (!proj || !legs.length) return;

      const raw = seg(0.52, 0.88) * (N - 1);
      const k = Math.min(N - 2, Math.floor(raw)), f = raw - k;
      const c = raw >= N - 1 ? N - 1 : k + io(Math.min(1, Math.max(0, (f - 0.35) / 0.65)));
      legs.forEach((Lg, i) => {
        const t = Math.min(1, Math.max(0, c - i));
        Lg.el.style.strokeDashoffset = String(Lg.len * (1 - t));
      });
      const li = Math.min(N - 2, Math.floor(c));
      const [px, py] = proj(legs[li].interp(Math.min(1, c - li))) as [number, number];
      pinEls.forEach((g, i) => {
        const lit = c >= i - 0.001;
        g.classList.toggle("lit", lit);
        g.querySelector(".pin")!.classList.toggle("lit", lit);
        if (visitedEls[i]) visitedEls[i]!.classList.toggle("visited", lit);
      });

      const out = io(seg(0.88, 0.95)), intro = io(seg(0.46, 0.52));
      const S = lerp(narrow ? 3 : 2.2, 1, out), s = lerp(1, S, intro);
      const tx = (vw / 2 - px * s) * (1 - out) * intro, ty = (vh * 0.45 - py * s) * (1 - out) * intro;
      cam.attr("transform", `translate(${tx},${ty}) scale(${s})`);
      const t3 = intro * (1 - out);
      $("mapWrap").style.transform = `perspective(1100px) rotateX(${t3 * 38}deg) scale(${1 + t3 * 0.12})`;
      const inv = 1 / s;
      pinEls.forEach((g) => {
        g.querySelectorAll("circle").forEach((ci) => ci.setAttribute("r", String(6 * inv)));
        const t = g.querySelector("text")!;
        t.setAttribute("font-size", String(13 * inv));
        t.setAttribute("x", String(11 * inv));
        t.setAttribute("y", String(-10 * inv));
      });
      planeEl.setAttribute("cx", String(px)); planeEl.setAttribute("cy", String(py)); planeEl.setAttribute("r", String(7 * inv));
      glowEl.setAttribute("cx", String(px)); glowEl.setAttribute("cy", String(py)); glowEl.setAttribute("r", String(20 * inv));

      const hud = seg(0.48, 0.52) * (1 - seg(0.88, 0.91));
      $("hudTop").style.opacity = String(hud);
      $("hudBar").style.width = (c / (N - 1)) * 100 + "%";
      const idx = Math.round(c), near = 1 - Math.min(1, Math.abs(c - idx) * 3);
      const card = $("card");
      card.style.opacity = String(hud * near);
      card.style.transform = `translateY(${(1 - near) * 24}px) perspective(900px) rotateX(${(1 - near) * 10}deg)`;
      if (idx !== lastIdx) {
        lastIdx = idx;
        const C = CITIES[idx];
        $("cCity").textContent = C.city; $("cCode").textContent = C.code;
        $("cTag").textContent = C.tag; $("cLeg").textContent = C.leg; $("cNote").textContent = C.note;
        $("hudCount").textContent = `${pad2(idx + 1)} / ${pad2(N)}`;
      }
      const sm = seg(0.92, 0.97);
      $("summary").style.opacity = String(sm);
      $("summary").style.transform = `translate(-50%,-50%) translateY(${(1 - sm) * 30}px) scale(${0.96 + sm * 0.04})`;
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
      onScroll();
    };
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => (countries ? build() : update()), 120);
    };

    addEventListener("pointermove", onPointerMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    update();

    const ctrl = new AbortController();
    fetch("/data/countries-110m.json", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((topo: Topology) => {
        const fc = topojson.feature(topo, topo.objects.countries as GeometryCollection) as FeatureCollection<Geometry>;
        countries = fc.features;
        landFC = fc;
        build();
      })
      .catch(() => {});

    return () => {
      ctrl.abort();
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      removeEventListener("pointermove", onPointerMove);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="flight" data-screen-label="01 Flight">
      <div className="stage" id="top">
        <div id="sky"><img src="/assets/hero-sky.jpg" alt="" /></div>

        <div id="mapLayer">
          <div id="mapWrap">
            <svg id="map" aria-label="International network map">
              <defs>
                <radialGradient id="ocean" cx="35%" cy="30%" r="80%">
                  <stop offset="0" stopColor="#a8dcff" />
                  <stop offset=".6" stopColor="#5fb2ff" />
                  <stop offset="1" stopColor="#2f8cff" />
                </radialGradient>
              </defs>
              <g id="globe">
                <circle className="atmo" id="gAtmo"></circle>
                <path className="sphere" id="gSphere"></path>
                <path className="grat" id="gGrat"></path>
                <path className="land" id="gLand"></path>
              </g>
              <g id="cam" style={{ display: "none" }}></g>
            </svg>
          </div>
        </div>

        <div id="hudTop" className="hud glass">
          <span className="eyebrow">International network</span>
          <div className="bar"><b id="hudBar"></b></div>
          <span className="eyebrow" id="hudCount">01 / 07</span>
        </div>
        <div id="card" className="hud glass">
          <div className="row"><span className="pill blue" id="cLeg">Home base</span><span className="pill" id="cTag"></span></div>
          <div className="big"><div id="cCity"></div><div id="cCode"></div></div>
          <p id="cNote"></p>
        </div>
        <div id="summary" className="hud glass">
          <span className="pill blue">Built on practical experience</span>
          <h2>Connecting aviation, business <span>&amp; opportunity.</span></h2>
          <div className="eq">
            <span>Experience</span><em>+</em><span>Expertise</span><em>+</em><span>International Network</span><em>+</em><span>Business Connections</span><em>=</em><span style={{ color: "var(--sky)" }}>Practical Solutions</span>
          </div>
          <div className="stats">
            <div className="stat"><b>36+</b><span>Years in aviation</span></div>
            <div className="stat"><b>6,950+</b><span>Flight hours</span></div>
            <div className="stat"><b>11</b><span>Aircraft types</span></div>
          </div>
        </div>

        <div id="winBox">
          <div id="frameShadow"></div>
          <div id="frame"></div>
          <div id="win">
            <img id="photo" src="/assets/hero-window-hd.jpg" alt="Colonel (R) Syed Haider Ali" />
            <div id="lid"></div>
            <div id="gloss"></div>
          </div>
          <div id="winTag" className="pill"><b>Col. (R) Syed Haider Ali</b><small>Founder &amp; Chairman</small></div>
        </div>

        <div id="heroCard" className="glass">
          <div className="chips"><span className="pill">Aviation</span><span className="pill">Business Solutions</span><span className="pill">International Opportunities</span></div>
          <h1>Genesis <span>AS</span></h1>
          <p className="tagline">Connecting Aviation, Business &amp; Opportunity</p>
          <p>We source, facilitate, coordinate and connect clients with qualified operators, owners, MROs, investors, businesses and service providers — built on decades of hands-on aviation leadership.</p>
          <div className="ctas"><a className="btn primary" href="#enquire">Make an enquiry</a><a className="btn ghost" href="#divisions">What we do</a></div>
        </div>
        <div id="cue" className="pill"><i></i>Scroll to fly</div>
      </div>
    </section>
  );
}
