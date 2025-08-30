export const EU_COUNTRIES = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
];

export const GLOBAL_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": "#shippingDetails-eu",
      "@type": "OfferShippingDetails",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: EU_COUNTRIES,
      },
    },
    {
      "@id": "#shippingDetails-world",
      "@type": "OfferShippingDetails",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "001",
      },
    },
  ],
};

export function shippingDetailsRefsForHost(host) {
  const base = host.replace(/\/$/, "");
  return GLOBAL_SCHEMA["@graph"]
    .filter((n) => n["@type"] === "OfferShippingDetails")
    .map((n) => `${base}${n["@id"]}`);
}
