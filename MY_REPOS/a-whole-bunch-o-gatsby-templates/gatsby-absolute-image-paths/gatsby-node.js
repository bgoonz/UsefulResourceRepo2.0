const path = require("path")

const getFileNode = (options) => (source, _, context, info) => {
  const { fieldName } = info
  const partialPath = source[fieldName]

  if (!partialPath) {
    return null
  }

  const filePath = path.join(__dirname, options.path, partialPath)

  const fileNode = context.nodeModel.runQuery({
    firstOnly: true,
    type: 'File',
    query: {
      filter: {
        absolutePath: {
          eq: filePath
        }
      }
    }
  })

  if (!fileNode) {
    return null
  }

  return fileNode
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions

  createFieldExtension({
    name: "fileByAbsolutePath",
    args: {
      path: {
        type: "String!",
        defaultValue: ""
      }
    },
    extend: (options) => ({
      resolve: getFileNode(options)
    })
  })

  createTypes(`
    type LocalContentCities implements Node {
      image: File @fileByAbsolutePath(path: "src/images")
    }
  `)
}
