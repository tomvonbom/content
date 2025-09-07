(function () {
  const { hostname, origin } = window.location;
  const [subdomain] = hostname.split(".");

  const policy = {
    "@context": "https://schema.org",
    "@type": "MerchantReturnPolicy",
    url: `${origin}/legales/politica-de-devoluciones`,
    name: `${subdomain ? `${subdomain} ` : ""}Return Policy`,
    merchantReturnDays: 30,
    returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(policy);
  document.head.appendChild(script);
})();
