import React, { Component } from 'react'
import Subapp from './subapp/Root'

class BigApp extends Component {
  render() {
    return (
      <div>
        <Subapp />
        <Subapp />
        <Subapp />
      </div>
    )
  }
}

// These subapps will be completely independent.
//
// They won't share data or actions, and won't see or communicate with each other.
// If you mix this approach with standard Redux approach of composing reducers, it
// will get extremely confusing so it's best if you pick just one: either your app
// is composed of pieces that follow Redux pattern holistically, or your app is so
// large and disjointed that smaller independent "subapps" make more sense.
//
// The first case is probably closer to normal web products, and the second case is
// closer to a "product hub", a "dashboard", or enterprise software where unrelated
// tools are grouped together because they're part of one package.