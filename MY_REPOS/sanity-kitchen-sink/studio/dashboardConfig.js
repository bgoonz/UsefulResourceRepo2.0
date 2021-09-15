export default {
  widgets: [
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
                  buildHookId: '612f9957d09b150c5c6c7478',
                  title: 'Sanity Studio',
                  name: 'sanity-kitchen-sink-studio-us5ymc5z',
                  apiId: '8a372fce-d992-44a2-9e26-34d68b465da6'
                },
                {
                  buildHookId: '612f9958ab4999102e8d50f5',
                  title: 'Blog Website',
                  name: 'sanity-kitchen-sink-web-geaa75ie',
                  apiId: '885830a2-ab62-4722-976c-46c09b9e392e'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/bgoonz/sanity-kitchen-sink',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-kitchen-sink-web-geaa75ie.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
