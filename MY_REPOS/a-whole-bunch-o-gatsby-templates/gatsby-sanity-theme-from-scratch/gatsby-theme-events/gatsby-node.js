const eventsTemplate = require.resolve('./src/templates/events.jsx')

exports.createPages = ({ actions }, { basePath = `/events` }) => {
  actions.createPage({
    path: basePath,
    component: eventsTemplate,
  })
}
