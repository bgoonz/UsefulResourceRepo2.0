import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Buttons, Button, Debug } from '../components'
import { Input } from '../components/forms'
import { getItems, resetItems } from '../redux/actions/items'

const DebugContainer = ({
  isLoading,
  error,
  handleGetData,
  handleResetData,
  data
}) => {
  useEffect(() => {
    handleGetData()
  }, [handleGetData])

  return (
    <>
      <form>
        <Input type='text' placeholder='/resources/:id' />
      </form>

      <Buttons>
        <Button onClick={handleGetData}>Get Data</Button>
        <Button onClick={handleResetData}>Reset Data</Button>
        {isLoading && <span>Loading...</span>}
      </Buttons>

      <Debug data={data || error} />
    </>
  )
}

DebugContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  handleGetData: PropTypes.func.isRequired,
  handleResetData: PropTypes.func.isRequired,
  data: PropTypes.any
}

export default connect(
  (state) => {
    return {
      isLoading: state.items.isLoading,
      error: state.items.error,
      data: state.items.data
    }
  },
  (dispatch) => {
    return {
      handleGetData: () => dispatch(getItems()),
      handleResetData: () => dispatch(resetItems())
    }
  }
)(DebugContainer)
