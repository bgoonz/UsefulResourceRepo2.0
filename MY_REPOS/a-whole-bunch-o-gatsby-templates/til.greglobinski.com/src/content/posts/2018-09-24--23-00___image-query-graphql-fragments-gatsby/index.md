---
title: DRY - Querying for image data with GraphQL fragments in Gatsby.js
categories:
  - code
  - DRY
tags:
  - Gatsby
  - GraphQL
---

It happens that we use exactly the same GraphQL query for querying an image data multiple times. Not necessarily on the same script as in the example below.

```javascript
export const query = graphql`
  query {
    pic1: file(relativePath: { eq: "pic1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    pic2: file(relativePath: { eq: "pic2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
```

In such a case we can use a [GraphQL fragments](https://graphql.org/learn/queries/#fragments) to **don't repeat yourself** ([DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)).

```javascript
export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const pageQuery = graphql`
  query {
    pic1: file(relativePath: { eq: "pic1.jpg" }) {
      ...fluidImage
    }
    pic2: file(relativePath: { eq: "pic2.jpg" }) {
      ...fluidImage
    }
  }
`;
```

Once we `export` the `fluidImage` fragment, we can use it in any GraphQL query across the Gatsby app.
