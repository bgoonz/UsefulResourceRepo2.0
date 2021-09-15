import { connect } from 'react-redux'

import TagsTree from './TagsTree'

const mapStateToProps = ({ tags }) => ({
  tags: tags.items,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsTree)
