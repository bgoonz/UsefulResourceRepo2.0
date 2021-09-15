import { connect } from 'react-redux'

import Person from './Person'
import { selectPerson } from 'store/persons/selectors'

const mapStateToProps = state => ({
  person: selectPerson(state),
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Person)
