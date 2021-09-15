/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
 title: "Bryan Guner Web Dev Docs",
   tagline: "I break things",
   url: "https://goofy-euclid-1cd736.netlify.app/",
   baseUrl: "/",
   onBrokenLinks: "throw",
   onBrokenMarkdownLinks: "warn",
   favicon: 'img/favicon.ico',
   organizationName: "Web-Dev-Hub",
   projectName: "Web-Dev-Hub",
  themeConfig: {
    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [ {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://github.com/bgoonz',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [ {
          title: 'Docs',
          items: [ {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [ 
            {
              label: 'Discord',
              href: 'https://discord.gg/hrVJqAs',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/bgooonz',
            },
          ],
        },
        {
          title: 'More',
          items: [ {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/bgoonz',
            },
          ],
        },
      ],
         copyright: `Copyright © ${new Date().getFullYear()}Bryan Guner 😊 -- This site was built with React`
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve( './sidebars.js' ),
         
          editUrl: 'https://github.com/bgoonz/Documentation-site-react',
        },
        blog: {
          showReadingTime: true,
          
          editUrl: 'https://github.com/bgoonz/Documentation-site-reactblog/',
        },
        theme: {
          customCss: require.resolve( './src/css/custom.css' ),
        },
      },
    ],
  ],
};
