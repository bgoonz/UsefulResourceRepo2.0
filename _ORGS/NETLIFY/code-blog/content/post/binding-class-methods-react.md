+++
date = "2016-06-09T13:28:29-07:00"
draft = false
title = "Binding ES Class Methods in React"
categories = ["react"]
tags = ["tips", "javascript", "react", "es6"]

+++

The choice between using the ES `class` method for declaring component in
React seems to be a decided convention within the React community. The
only issue with it the need to bind the context of `this` everytime you
create a function. This way you have 

The [Netlify login](https://app.netlify.com/login) form is an easy enough component to look at:

```js
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loginError: null};
  }

  onLogin(provider) {
    return (event) => {
      // ...
    };
  }

  render() {
    const login = () => this.onLogin.bind;
    return <LoginForm handleLogin={login} loginError={this.state.loginError}/>;
  }
}
```
Everytime you need to use a class function you have two options: 

```js
return <LoginForm handleLogin={this.onLogin.bind(this)} loginError={this.state.loginError}/>;
```

*This option will not pass the default [eslint](http://eslint.org/docs/rules/no-extra-bind) settings, due the unpopular use of bind in jsx.*

```js
const login = () => this.onLogin
return <LoginForm handleLogin={login} loginError={this.state.loginError}/>;
```
*The problem here is the need to create a separate function to gain access to
the lexically scoped `this`. This will create a new function object every time `render` is called* 


A new way to handling the the binding of class methods do this has arisen and it's actually pretty nice. Just add the `bind(this)` to the class's constructor.

```js
constructor(props) {
  super(props);
  // ...
  this.onLogin = this.onLogin.bind(this);
}
```

Now you can call just call `this.onLogin` directly, which save a bit
of typing and maybe a `kb` or two in minification.

```js
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // ...
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(provider) {
    return (event) => {
      // ...
    };
  }

  // this.onLogin will now just use the function defined
  // in the constructor no need to create a whole new function

  render() {
    const login = () => this.onLogin.bind;
    return <LoginForm handleLogin={this.onLogin} loginError={this.state.loginError}/>;
  }
}
```
## How do you handle binding class methods in React, what are your thoughts?
