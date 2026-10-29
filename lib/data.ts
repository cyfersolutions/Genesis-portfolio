export const INTERESTS = [
  "Aircraft Leasing / Acquisition",
  "Aircraft Maintenance / C-Check",
  "Aircraft Charter",
  "Air Ambulance / Medical Evacuation",
  "Aviation Consulting",
  "Business Consulting",
  "Import / Export",
  "Industrial & Commercial Opportunities",
  "Investment",
  "Talent Acquisition / Employment",
  "Other",
];

export const CONTACT_EMAIL = "info@genesisas.com";
export const WHATSAPP_URL = `https://wa.me/923335104077?text=${encodeURIComponent("Hello Genesis AS, I'd like to make an enquiry.")}`;
export const INSTAGRAM_URL = "https://www.instagram.com/genesisair";

// network route — ll = [longitude, latitude]
export type City = {
  city: string;
  code: string;
  tag: string;
  leg: string;
  ll: [number, number];
  note: string;
};

export const CITIES: City[] = [
  { city: "Islamabad", code: "ISB", tag: "Pakistan", leg: "Home base", ll: [73.05, 33.68], note: "Genesis AS headquarters — where aviation, business and opportunity connect." },
  { city: "Dubai", code: "DXB", tag: "MRO · Charter", leg: "Gulf hub", ll: [55.36, 25.25], note: "Hawker 4000 ferry and maintenance coordination. A key hub for MRO, charter and air ambulance partners." },
  { city: "Vienna", code: "VIE", tag: "Service centre", leg: "Europe", ll: [16.57, 48.11], note: "Citation Bravo maintenance visits (2008, 2011) — direct experience with European service centres." },
  { city: "Zurich", code: "ZRH", tag: "MRO", leg: "Europe", ll: [8.55, 47.46], note: "Coordinating aircraft to appropriate international facilities for C-Checks and major inspections." },
  { city: "Paris", code: "CDG", tag: "Ferry flight", leg: "Europe", ll: [2.55, 49.01], note: "Citation Bravo ferry, 2014 — working with OEMs and simulator training institutions in France." },
  { city: "England", code: "UK", tag: "Ferry flight", leg: "Europe", ll: [-1.5, 52.4], note: "King Air B-200 ferry, 2010 — and training partnerships in the UK." },
  { city: "United States", code: "USA", tag: "Acquisition", leg: "Americas", ll: [-97.43, 37.65], note: "Citation Bravo acquired and ferried from the USA to Pakistan — hands-on aircraft acquisition experience." },
];

export const DIVISIONS = [
  { href: "#aviation", n: "01 · Core division", title: "Aviation Services", text: "Aircraft leasing & acquisition, maintenance & MRO, charter, and air ambulance coordination — through a trusted international network.", go: "Explore aviation services →", lead: true },
  { href: "#consulting", n: "02", title: "Aviation Consulting & Advisory", text: "Operations, technical, MRO and strategic aviation advice grounded in practical execution.", go: "Learn more →" },
  { href: "#business", n: "03", title: "Business & Strategic Consulting", text: "Business development, partnerships, market entry and cross-border facilitation.", go: "Learn more →" },
  { href: "#business", n: "04", title: "International Trade", text: "Import & export facilitation connecting Pakistani and international buyers and suppliers.", go: "Learn more →" },
  { href: "#business", n: "05", title: "Industrial, Commercial Development & Investment", text: "Industrial sites, zones and facilities for businesses establishing or expanding.", go: "Learn more →" },
  { href: "#business", n: "06", title: "Human Capital & Talent Acquisition", text: "Matching the right person with the right organisation — locally and internationally.", go: "Learn more →" },
];

export const AVIATION = [
  { ic: "LA", title: "Aircraft Leasing & Acquisition", items: ["Aircraft leasing and sourcing", "Aircraft acquisition and sale facilitation", "Connecting aircraft owners, operators and clients", "Identifying suitable aircraft to match your requirements"] },
  { ic: "MR", title: "Aircraft Maintenance & MRO", items: ["Maintenance planning and coordination", "C-Checks and major inspections", "Aircraft technical support", "Coordination with international MROs and service centres", "Taking aircraft to the right facility internationally"], hubs: ["Zurich", "Vienna", "Dubai", "+ other destinations"] },
  { ic: "CH", title: "Aircraft Charter", items: ["Private and business aircraft charter", "Aircraft sourced to passenger and destination requirements", "Charter coordination through suitable operators and aircraft providers"] },
  { ic: "AA", title: "Air Ambulance & Medical Evacuation", items: ["Facilitation and coordination of air ambulance services", "Access to suitable aircraft and operators in Pakistan and internationally", "Medical evacuation and emergency charter requirements", "Relationships with specialised international air ambulance operators"], note: "Genesis AS facilitates and coordinates air ambulance services through qualified operators and partners. We do not operate an air ambulance fleet." },
];

export const CONSULTING_CHIPS = [
  "Aircraft operations", "Aircraft leasing & acquisition", "Maintenance & technical matters", "MRO selection & coordination",
  "Aviation business development", "Strategic aviation advice", "International aviation partnerships", "Representation & facilitation",
];

export const BUSINESS = [
  { n: "03", title: "Business & Strategic Consulting", items: ["Business development", "Strategic partnerships", "International business facilitation", "Market entry", "Commercial representation", "Investor and business introductions", "Cross-border opportunities", "Strategic networking and relationship building"] },
  { n: "04", title: "International Trade — Import & Export", items: ["Sourcing products and suppliers", "Connecting Pakistani exporters with international buyers", "Connecting international suppliers with Pakistani buyers", "Import / export facilitation", "International trading opportunities", "Commercial representation"], note: "Specific products and industries can be added as this division grows." },
  { n: "05", title: "Industrial, Commercial Development & Investment", items: ["Industrial land, sites, estates and zones", "Locations for factories and businesses", "Warehouses and commercial facilities", "Site identification for investors", "Industrial expansion and relocation", "Investment facilitation"], note: "Focused on business and industrial facilitation — not residential property." },
  { n: "06", title: "Human Capital, Talent Acquisition & Career Placement", items: ["Identifying qualified professionals", "Talent acquisition and recruitment facilitation", "Career placement", "International employment opportunities", "Connecting employers with qualified candidates"], note: "The right person, with the right organisation." },
  { n: "07", title: "Human Resource & Professional Development", items: ["Professional and skills development", "Career guidance", "Training and capacity building", "Professional networking", "Developing human capital for organisations"] },
];

export const FOUNDER_STATS = [
  { b: "36+", span: "Years in aviation" },
  { b: "6,950+", span: "Flight hours" },
  { b: "20", span: "Years instructing" },
  { b: "11", span: "Aircraft types" },
];

export const FOUNDER_HIGHLIGHTS = [
  "Captain, Pakistan International Airlines; Boeing 737-800 NG operations at Serene Air",
  "Adviser to the Chairman, Lakson Group — Air Arabia–Lakson JV (Fly Jinnah)",
  "Chief Pilot; flew heads of state and foreign delegations",
  "International ferry flights to the USA, UK, Germany, Austria, France and Dubai",
  "Hands-on work with service centres and OEMs on maintenance and aircraft sale/purchase",
  "ATPL · Flying Instructor (FIS, affiliated with RAF Central Flying School) · MSc Disaster Risk Management",
];

export const ROLES = [
  { logo: "Lakson Group logo", org: "LAKSON GROUP", title: "Adviser to the Chairman", text: "Aviation and strategic advisory, including the Group's aviation interests and Fly Jinnah.", links: [{ label: "Visit Lakson ↗", href: "https://www.lakson.com.pk" }, { label: "Fly Jinnah ↗", href: "https://www.flyjinnah.com" }] },
  { logo: "Blinq logo", org: "BLINQ SOLUTIONS (PVT.) LTD.", title: "Channel Partner", text: "A Pakistan-based B2B fintech and digital payment solutions company.", links: [{ label: "Visit Blinq ↗", href: "https://blinq.pk" }] },
  { logo: "SASSA Group logo", org: "SASSA GROUP", title: "Executive Director", text: "Business development, corporate strategy and commercial opportunities in elevators and escalators.", links: [{ label: "Visit organisation ↗" }] },
  { logo: "Bescherming logo", org: "BESCHERMING SOLUTIONS (PVT.) LTD.", title: "Head of Aviation Division", text: "Aviation business development and strategic initiatives within aerospace, technical and industrial solutions.", links: [{ label: "Visit organisation ↗" }] },
  { logo: "ESS.I.AAR logo", org: "ESS.I.AAR", title: "Executive Director — Strategy & Business Development", text: "Planning, Engineering & Services Consultants: new opportunities, relationships and strategic growth.", links: [{ label: "Visit ESS.I.AAR ↗", href: "https://ess-i-aar.com" }] },
];

export const WHY = [
  { n: "01", title: "Experience", text: "Decades of operational and leadership experience in aviation." },
  { n: "02", title: "Expertise", text: "Command of both the technical and commercial sides." },
  { n: "03", title: "International Network", text: "Relationships with operators, MROs and partners worldwide." },
  { n: "04", title: "Integrity", text: "Accurate positioning and honest advice, every time." },
  { n: "05", title: "Confidentiality", text: "Discretion for sensitive transactions and enquiries." },
  { n: "06", title: "Strategic Thinking", text: "Long-term perspective shaped at chairman level." },
  { n: "07", title: "Practical Solutions", text: "Answers built on what works in the real world." },
  { n: "08", title: "Execution", text: "We follow through — from first contact to delivery." },
];
