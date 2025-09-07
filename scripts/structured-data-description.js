export function getAbsoluteImageUrl(mainMedia) {
  const mm = String(mainMedia || "");
  if (!mm) return "";

  // Absolute URL already
  if (/^https?:\/\//i.test(mm)) return mm;

  // wix:image:// scheme (with or without v1/)
  if (mm.startsWith("wix:image://")) {
    const V1 = "wix:image://v1/";
    const BASE = "wix:image://";
    const startIdx = mm.startsWith(V1) ? V1.length : BASE.length;

    const tail = mm.slice(startIdx);
    const firstSlash = tail.indexOf("/");
    const mediaIdRaw = firstSlash >= 0 ? tail.slice(0, firstSlash) : tail;
    const mediaId = mediaIdRaw.split("#")[0].split("?")[0];

    return mediaId ? `https://static.wixstatic.com/media/${mediaId}` : "";
  }

  // Any other scheme: return as-is for compatibility
  return mm;
}

export function buildStructuredData(item = {}) {
  const {
    seoDescription,
    metaDescription,
    description: rawDescription,
    name = "",
  } = item;

  const description =
    seoDescription ||
    metaDescription ||
    (rawDescription ? rawDescription.replace(/<[^>]*>/g, "") : "") ||
    name;

  return {
    "@context": "https://schema.org",
    "@type": "Thing",
    name,
    description, // previously: item.seoData?.description || "",
  };
}
