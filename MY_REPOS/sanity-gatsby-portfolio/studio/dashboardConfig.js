export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '61313f6c1bfb012793dca091',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-89chyji1',
                  apiId: 'cac5ca49-3e52-4633-812c-a3f18ffebccc'
                },
                {
                  buildHookId: '61313f6c988a02296d747360',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-1wwhtk8k',
                  apiId: '709a341a-4352-403d-af4d-9284733ac8e7'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/bgoonz/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-1wwhtk8k.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
