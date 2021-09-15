import { connect } from 'react-redux'

import TagsGraph from './TagsGraph'

const mapStateToProps = ({ tags }) => ({
  tags: tags.items,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsGraph)
