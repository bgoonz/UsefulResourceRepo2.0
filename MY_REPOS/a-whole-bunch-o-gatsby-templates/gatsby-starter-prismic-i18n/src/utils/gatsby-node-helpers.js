const locales = require('../../config/i18n')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
exports.wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

// Remove trailing slashes unless it's only "/", then leave it as it is
exports.replaceTrailing = path => (path === `/` ? path : path.replace(/\/$/, ``))

// Remove slashes at the beginning and end
exports.replaceBoth = _path => _path.replace(/^\/|\/$/g, '')

// If the "lang" is the default language, don't create a prefix. Otherwise add a "/$path" before the slug (defined in "locales")
exports.localizedSlug = node =>
  locales[node.lang].default ? `/${node.uid}` : `/${locales[node.lang].path}/${node.uid}`
