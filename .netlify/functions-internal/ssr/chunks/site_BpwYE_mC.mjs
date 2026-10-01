const site = {
  name: "Linkly LLC",
  /** [PLACEHOLDER: confirm the production domain this will launch on] */
  url: "https://www.linklyllc.com",
  tagline: "Custom web development and product engineering for ambitious businesses.",
  email: "hello@linklyllc.com",
  /**
   * [PLACEHOLDER: real US phone number in E.164 format, e.g. "+15555550123"]
   * Left empty on purpose: the phone line is hidden sitewide until a real
   * number is supplied, rather than showing a placeholder to visitors.
   */
  phone: "",
  /** Registered business address. Required for CAN-SPAM notices and the legal pages. */
  address: {
    // [PLACEHOLDER: registered business street address]
    street: "[PLACEHOLDER: street address]",
    // [PLACEHOLDER: city]
    city: "[PLACEHOLDER: city]",
    // [PLACEHOLDER: state / province]
    region: "[PLACEHOLDER: state]",
    // [PLACEHOLDER: ZIP code]
    postalCode: "[PLACEHOLDER: ZIP code]",
    country: "United States"
  },
  socials: [
    // [PLACEHOLDER: real profile URLs — each entry without a url is hidden]
    { label: "Linkly LLC on X", url: "", icon: "mdi:twitter" },
    { label: "Linkly LLC on YouTube", url: "", icon: "mdi:youtube" },
    { label: "Linkly LLC on GitHub", url: "", icon: "mdi:github" },
    { label: "Linkly LLC on LinkedIn", url: "", icon: "mdi:linkedin" },
    { label: "Linkly LLC on Discord", url: "", icon: "ic:baseline-discord" }
  ],
  /**
   * Legal-entity details consumed by /privacy-policy, /terms-of-service and
   * /refund-policy. These are deliberately unresolved tokens — they must be
   * replaced with attorney-reviewed values before launch.
   */
  legal: {
    entityName: "[PLACEHOLDER: LEGAL ENTITY NAME]",
    stateOfFormation: "[PLACEHOLDER: STATE OF FORMATION]",
    effectiveDate: "[PLACEHOLDER: EFFECTIVE DATE]",
    contactEmail: "[PLACEHOLDER: CONTACT EMAIL for privacy and legal requests]"
  }
};
const socialsWithUrls = site.socials.filter(
  (social) => social.url.length > 0
);
const hasPhone = site.phone.length > 0;
const addressLines = [
  site.address.street,
  site.address.city,
  [site.address.region, site.address.postalCode].filter(Boolean).join(" "),
  site.address.country
].filter((line) => line.length > 0);

export { addressLines as a, socialsWithUrls as b, hasPhone as h, site as s };
