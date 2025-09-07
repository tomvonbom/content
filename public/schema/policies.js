// --- Países y utilidades ---
export const EU_COUNTRIES = [
  "ES",
  "PT",
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
  "RO",
  "SK",
  "SI",
  "SE",
];

const WEEKDAYS = [
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
];

const qv = (min, max) => {
  const out = { "@type": "QuantitativeValue", unitCode: "d" };
  const hasMin = Number.isFinite(min);
  const hasMax = Number.isFinite(max);
  if (hasMin) out.minValue = min;
  if (hasMax) out.maxValue = max;
  return hasMin || hasMax ? out : undefined;
};

export const deliveryTime = (hMin, hMax, tMin, tMax, cutoff = "T15:00:00") => {
  const dt = {
    "@type": "ShippingDeliveryTime",
    businessDays: { "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS },
    cutoffTime: cutoff,
  };
  const handling = qv(hMin, hMax);
  const transit = qv(tMin, tMax);
  if (handling) dt.handlingTime = handling;
  if (transit) dt.transitTime = transit;
  return dt;
};

const rate = (eurValue = 0) => ({
  "@type": "MonetaryAmount",
  value: Number.isFinite(Number(eurValue))
    ? String(Number(eurValue).toFixed(2))
    : "0.00",
  currency: "EUR",
});

const getHostname = (hostOrUrl = "") => {
  try {
    return new URL(
      hostOrUrl.includes("://") ? hostOrUrl : `https://${hostOrUrl}`
    ).hostname.toLowerCase();
  } catch {
    return String(hostOrUrl || "").toLowerCase();
  }
};

// --- IDs por host (establecemos @id sobre el dominio www para centralizar) ---
export const policyIdForHost = (hostOrUrl = "") => {
  const hn = getHostname(hostOrUrl);
  if (hn.startsWith("pt.")) return "https://www.koreanbeautyshopeu.com/#mrp-pt";
  if (hn.startsWith("en.")) return "https://www.koreanbeautyshopeu.com/#mrp-en";
  return "https://www.koreanbeautyshopeu.com/#mrp-es";
};

export const shippingDetailsRefsForHost = (hostOrUrl = "") => {
  const hn = getHostname(hostOrUrl);
  if (hn.startsWith("pt.")) {
    return [{ "@id": "https://www.koreanbeautyshopeu.com/#ship-pt" }];
  }
  if (hn.startsWith("en.")) {
    return [{ "@id": "https://www.koreanbeautyshopeu.com/#ship-en" }];
  }
  return [{ "@id": "https://www.koreanbeautyshopeu.com/#ship-es" }];
};

// --- JSON-LD global (solo nodos) ---
export const GLOBAL_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": "Organization",
      "@id": "https://www.koreanbeautyshopeu.com/#org",
      name: "Korean Beauty Shop",
      url: "https://www.koreanbeautyshopeu.com",
      hasMerchantReturnPolicy: [
        { "@id": "https://www.koreanbeautyshopeu.com/#mrp-es" },
        { "@id": "https://www.koreanbeautyshopeu.com/#mrp-pt" },
        { "@id": "https://www.koreanbeautyshopeu.com/#mrp-en" },
      ],
    },

    // MerchantReturnPolicy ES / PT / EN
    {
      "@type": "MerchantReturnPolicy",
      "@id": "https://www.koreanbeautyshopeu.com/#mrp-es",
      url: "https://www.koreanbeautyshopeu.com/legales/politica-de-devoluciones",
      applicableCountry: "ES",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    },
    {
      "@type": "MerchantReturnPolicy",
      "@id": "https://www.koreanbeautyshopeu.com/#mrp-pt",
      url: "https://pt.koreanbeautyshopeu.com/legales/politica-de-devoluciones",
      applicableCountry: "PT",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    },
    {
      "@type": "MerchantReturnPolicy",
      "@id": "https://www.koreanbeautyshopeu.com/#mrp-en",
      url: "https://en.koreanbeautyshopeu.com/legales/politica-de-devoluciones",
      applicableCountry: EU_COUNTRIES.filter((c) => !["ES", "PT"].includes(c)),
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    },

    // --- OfferShippingDetails ES (combinado) ---
    {
      "@type": "OfferShippingDetails",
      "@id": "https://www.koreanbeautyshopeu.com/#ship-es",
      url: "https://www.koreanbeautyshopeu.com/legales/envios-y-entregas",
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "ES" },
      shippingRate: rate(6.0),
      freeShippingThreshold: rate(50.0),
      deliveryTime: deliveryTime(0, 1, 2, 7),
    },

    // --- OfferShippingDetails PT (combinado) ---
    {
      "@type": "OfferShippingDetails",
      "@id": "https://www.koreanbeautyshopeu.com/#ship-pt",
      url: "https://pt.koreanbeautyshopeu.com/legales/envios-y-entregas",
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "PT" },
      shippingRate: rate(6.0),
      freeShippingThreshold: rate(50.0),
      deliveryTime: deliveryTime(0, 1, 2, 3),
    },

    // --- OfferShippingDetails EN (combinado) ---
    {
      "@type": "OfferShippingDetails",
      "@id": "https://www.koreanbeautyshopeu.com/#ship-en",
      url: "https://en.koreanbeautyshopeu.com/legales/shipping-and-delivery",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: EU_COUNTRIES.filter((c) => !["ES", "PT"].includes(c)),
      },
      shippingRate: rate(10.0),
      freeShippingThreshold: rate(99.0),
      deliveryTime: deliveryTime(0, 2, 3, 8),
    },
  ],
};
