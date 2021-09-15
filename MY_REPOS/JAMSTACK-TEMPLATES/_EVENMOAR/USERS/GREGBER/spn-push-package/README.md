# spn-push-package
[![Build Status](https://travis-ci.org/hipush/spn-push-package.svg?branch=master)](https://travis-ci.org/hipush/spn-push-package)
[![Dependency Status](https://david-dm.org/hipush/spn-push-package.svg?theme=shields.io)](https://david-dm.org/hipush/spn-push-package)
[![devDependency Status](https://david-dm.org/hipush/spn-push-package/dev-status.svg?theme=shields.io)](https://david-dm.org/hipush/spn-push-package#info=devDependencies)

Generate a Safari Push Notifications package.

According to the [documentation of Apple](https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html#//apple_ref/doc/uid/TP40013225-CH3-SW7).

## Install

```
npm install spn-push-package
```

## Usage

```js
var path = require('path');
var spnPushPackage = require('spn-push-package');

var iconset = spnPushPackage.generateIconSet('/my/icon/path.jpg');

var zipStream = spnPushPackage.generate({
  websiteJSON: {
    websiteName: 'Hipush',
    websitePushId: 'web.net.hipush',
    allowedDomains: ['http://hipush.net'],
    urlFormatString: '%s',
    authenticationToken: '19f8d7a6e9fb8a7f6d9330dabe',
    webServiceURL: 'http://hipush.net/api/apple'
  },
  iconset: iconset,
  key: '/path/to/mykey.pem',
  keyPass: 'password',
  cert: '/path/to/mycert.pem'
});

zipStream.pipe(fs.createWriteStream('/my/pushPackage.zip', {flags: 'w'}));
```

### spnPushPackage.generateIconSet(image)

Generate an icon set from a path.

**Arguments:**
```
@param {string} image Path of the image
```

**Returns:**
```
@returns {object} iconset Map of icon streams
```

**Example:**
```js
var iconset = spnPushPackage.generateIconSet('/my/icon/path.jpg');
```

### spnPushPackage.generateIcon(image, size)

Generate a specific icon from a path.

**Arguments:**
```
@param {string} image Path of the image
@param {string} size Size of the image
```

**Returns:**
```
@returns {stream.Readable} iconStream
```

**Example:**
```js
var icon = spnPushPackage.generateIcon('/my/icon/path.jpg', '16x16@2x');
```

### spnPushPackage.generate(options)

Generate a push package.

**Arguments:**
```
 * @param {object} options Options
 * @param {string} options.key Key path
 * @param {string} options.cert Cert path
 * @param {string} [options.keyPass] Key password
 * @param {object} options.websiteJSON WebsiteJSON entries
 * @param {object} options.iconset An object containing a map of stream.
```

**Returns:**
```
@returns {stream.Readable} zipStream
```

**Example:**
```js
var zipStream = spnPushPackage.generate({
  websiteJSON: {
    websiteName: 'Hipush',
    websitePushId: 'web.net.hipush',
    allowedDomains: ['http://hipush.net'],
    urlFormatString: '%s',
    authenticationToken: '19f8d7a6e9fb8a7f6d9330dabe',
    webServiceURL: 'http://hipush.net/api/apple'
  },
  iconset: iconset,
  key: '/path/to/key.pem',
  keyPass: 'password',
  cert: '/path/to/cert.pem'
});
```

## License

MIT
