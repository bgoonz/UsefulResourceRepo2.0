var osiLicenses = Object.keys(require('osi-licenses')).map(function (license) {
  return license.toLowerCase()
})

var aliases = {
  'bsd': 'BSD-2-Clause',
  'mit': 'MIT',
  'x11': 'MIT',
  'mit/x11': 'MIT',
  'apache 2.0': 'Apache-2.0',
  'apache2': 'Apache-2.0',
  'apache 2': 'Apache-2.0',
  'apache-2': 'Apache-2.0',
  'apache': 'Apache-2.0',
  'gpl': 'GPL-3.0',
  'gplv3': 'GPL-3.0',
  'gplv2': 'GPL-2.0',
  'gpl3': 'GPL-3.0',
  'gpl2': 'GPL-2.0',
  'lgpl': 'LGPL-2.1',
  'lgpl2': 'LGPL-2.1',
  'lgpl2.1': 'LGPL-2.1',
  'lgplv2': 'LGPL-2.1',
  'lgplv2.1': 'LGPL-2.1',
  'lgplv3': 'LGPL-3.0',
  'lgplv3.0': 'LGPL-3.0',
  'lgpl3': 'LGPL-3.0',
  'lgpl3.0': 'LGPL-3.0',
  'cc0': 'cc0-1.0',
  'wtfpl': 'wtfplv2'
}

var alternatives = {
  'cc0-1.0': 'http://creativecommons.org/publicdomain/zero/1.0/',
  'wtfplv2': 'http://www.wtfpl.net/about/'
}

module.exports = function licenseNameToUrl (name) {
  if (aliases[name.toLowerCase()]) {
    name = aliases[name.toLowerCase()]
  }

  if (~osiLicenses.indexOf(name.toLowerCase())) {
    return 'http://opensource.org/licenses/' + name
  }

  if (alternatives[name.toLowerCase()]) {
    return alternatives[name.toLowerCase()]
  }

  return null
}
