export function getProductUrl(baseUrl, slug) {
  const base = String(baseUrl || "").replace(/\/$/, "");
  const cleanSlug = String(slug || "").replace(/^\//, "");
  return cleanSlug ? `${base}/product-page/${cleanSlug}` : base;
}

export default getProductUrl;
