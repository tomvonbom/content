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
