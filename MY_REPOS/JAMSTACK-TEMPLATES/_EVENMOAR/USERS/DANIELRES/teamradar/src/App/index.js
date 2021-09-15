import { connect } from 'react-redux'

import App from './App'

const mapStateToProps = ({ location }) => ({ page: location.type })

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
