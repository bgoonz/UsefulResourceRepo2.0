import { connect } from 'react-redux'

import Dev from './Dev'
import { setDevPreview } from 'store/dev/actions'

const mapStateToProps = ({ dev: { preview } }) => ({
  preview: preview ? JSON.stringify(preview, undefined, 2) : null,
})

const mapDispatchToProps = dispatch => ({
  resetAndSeedDb: async e => {
    e.preventDefault()
    const { result } = await (await fetch(`/api/dev/db/reset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })).json()
    dispatch(setDevPreview(result))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dev)
