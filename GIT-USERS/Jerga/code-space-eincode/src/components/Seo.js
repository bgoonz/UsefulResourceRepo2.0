import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function Seo({ title, image, description, meta = [] }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const defaultTitle = title
    ? `${title} | ${site.siteMetadata?.title}`
    : site.siteMetadata?.title;
  const defaultDescription = description || site.siteMetadata?.description;
  const defaultImage =
    image ||
    "https://files.cdn.thinkific.com/courses/course_card_image_000/896/4641598445801.medium.png";

  // TODO: og:url
  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={defaultTitle}
      meta={[
        {
          name: "description",
          content: defaultDescription,
        },
        {
          name: "google-site-verification",
          content: "vI9Smq6jbiI-QqeTCAmznQ_T14iRbvTjIpU_KKROJLA",
        },
        {
          name: "og:title",
          content: defaultTitle,
        },
        {
          name: "og:description",
          content: defaultDescription,
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:image",
          content: defaultImage,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: "Code Space",
        },
        {
          name: "twitter:title",
          content: defaultTitle,
        },
        {
          name: "twitter:description",
          content: defaultDescription,
        },
        {
          name: "twitter:image",
          content: defaultImage,
        },
      ].concat(meta)}
    />
  );
}
