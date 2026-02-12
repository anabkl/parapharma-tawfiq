import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, url }) {
  const siteTitle = "Parapharmacie Tawfiq | Khouribga";
  const defaultDesc = "Your trusted Parapharmacy in Khouribga. Authentic products, best prices, and expert advice.";

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:url" content={`https://parapharmacie.me${url || ""}`} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index, follow" />
      
      {/* Local Business Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Pharmacy",
          "name": "Parapharmacie Tawfiq",
          "image": "https://parapharmacie.me/logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Centre Ville",
            "addressLocality": "Khouribga",
            "addressCountry": "MA"
          },
          "telephone": "+212600000000",
          "url": "https://parapharmacie.me"
        })}
      </script>
    </Helmet>
  );
}
