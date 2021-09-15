import { connect } from 'react-redux'

import PersonsList from './PersonsList'
import { selectPersons } from 'store/persons/selectors'

const mapStateToProps = state => ({
  persons: selectPersons(state),
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonsList)
