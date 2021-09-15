export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "61313f9b21e0dd27d4a0e6c3",
                  title: "Sanity Studio",
                  name: "sanity-gatsby-blog-studio-m195df5o",
                  apiId: "71431860-47dc-4192-9882-f68affb510cf",
                },
                {
                  buildHookId: "61313f9bdbacc7325db36345",
                  title: "Blog Website",
                  name: "sanity-gatsby-blog-web-skwx3b17",
                  apiId: "e8a5d2c6-6b14-44a2-a8a0-3fb18ebcdd05",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/bgoonz/sanity-gatsby-blog",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://sanity-gatsby-blog-web-skwx3b17.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
