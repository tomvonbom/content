export function pickBreadcrumbs(sdArray) {
  const out = [];
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (n["@type"] === "BreadcrumbList") out.push(n);
    const g = n["@graph"];
    if (Array.isArray(g)) g.forEach(walk);
  };
  sdArray.forEach(walk);
  return out;
}

export function pickFaqPages(sdArray) {
  const out = [];
  const isFaq = (t) =>
    typeof t === "string"
      ? t === "FAQPage"
      : Array.isArray(t) && t.includes("FAQPage");
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (isFaq(n["@type"])) out.push(n);
    const g = n["@graph"];
    if (Array.isArray(g)) g.forEach(walk);
  };
  sdArray.forEach(walk);
  return out;
}

export function pickHowTos(sdArray) {
  const out = [];
  const seen = new Set();
  const isHowTo = (t) =>
    typeof t === "string"
      ? t === "HowTo"
      : Array.isArray(t) && t.includes("HowTo");
  const pushIf = (node) => {
    if (!node || !isHowTo(node["@type"])) return;
    const key = node["@id"] || JSON.stringify(node);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(node);
    }
  };
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    pushIf(n);
    for (const value of Object.values(n)) {
      if (Array.isArray(value)) value.forEach(walk);
      else walk(value);
    }
  };
  sdArray.forEach(walk);
  return out;
}
