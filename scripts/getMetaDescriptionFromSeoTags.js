/**
 * Extrae la meta description desde las tags SEO
 */
export function getMetaDescriptionFromSeoTags(p) {
  try {
    const seo = p && p.seo;
    const seoData = p && p.seoData;
    const tags =
      (seo && Array.isArray(seo.tags) && seo.tags) ||
      (seoData && Array.isArray(seoData.tags) && seoData.tags) ||
      [];
    const tag = tags.find(t => {
      const name = t && t.props && t.props.name;
      return String(name || "").toLowerCase() === "description";
    });
    const props = tag && tag.props;
    const val = props ? (props.content != null ? props.content : props.value) : "";
    return strip(val);
  } catch (_) {
    return "";
  }
}

function strip(value) {
  return typeof value === "string" ? value.trim() : "";
}

