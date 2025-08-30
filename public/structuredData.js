import { GLOBAL_SCHEMA, shippingDetailsRefsForHost } from "./globalSchema.js";

export function buildMainJsonLd(host, product) {
  const shippingRefs = shippingDetailsRefsForHost(host).map((id) => ({
    "@id": id,
  }));
  const offer = {
    "@type": "Offer",
    price: product.price,
    shippingDetails: shippingRefs,
  };
  const productNode = {
    "@type": "Product",
    name: product.name,
    offers: offer,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [...GLOBAL_SCHEMA["@graph"], productNode],
  };
}
