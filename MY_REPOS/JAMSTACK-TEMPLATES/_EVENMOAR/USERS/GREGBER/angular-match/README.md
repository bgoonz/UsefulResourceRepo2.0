# angular-match

# This plugin is no longer actively maintained, you can still use it but issues will not be resolved. If you want the npm name, you can contact me by email.

[![Build Status](https://travis-ci.org/neoziro/angular-match.svg?branch=master)](https://travis-ci.org/neoziro/angular-match)
[![Dependency Status](https://david-dm.org/neoziro/angular-match.svg?theme=shields.io)](https://david-dm.org/neoziro/angular-match)
[![devDependency Status](https://david-dm.org/neoziro/angular-match/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/angular-match#info=devDependencies)

Validate if two inputs match the same value. 

## Install

```
bower install angular-match
```

## Usage

```html
<form class="signupForm">
    <input type="password" name="password" ng-model="password">
    <input type="password" name="repeatPassword" match="password">

    <div ng-show="myForm.repeatPassword.$error.match">Password do not match!</div>
</form>
```

## License

MIT
