import { Helmet } from "react-helmet-async";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type SeoProps = {
  title: string;
  description: string;
  image: string;
  path: string;
  jsonLd?: JsonValue;
};

function Seo({ title, description, image, path, jsonLd }: SeoProps) {
  const canonicalUrl = new URL(path, window.location.origin).toString();
  const imageUrl = new URL(image, window.location.origin).toString();
  const pageTitle = `${title} | Burger Taste`;
  const jsonLdContent =
    jsonLd === undefined
      ? undefined
      : JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLdContent !== undefined && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdContent }}
        />
      )}
    </Helmet>
  );
}

export default Seo;
