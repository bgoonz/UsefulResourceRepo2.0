import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { LoadingSpinner, Items } from '../components'
import { getItems } from '../redux/actions/items'

const ItemsContainer = ({ isLoading, handleGetItems, items }) => {
  useEffect(() => {
    handleGetItems()
  }, [handleGetItems])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && items && items.length > 0 && <Items items={items} />}
      {!isLoading && items.length <= 0 && (
        <p>Sorry, items are empty. You might have to refresh the page.</p>
      )}
    </>
  )
}

ItemsContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.array,
  handleGetItems: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      isLoading: state.items.isLoading,
      items: state.items.data || []
    }
  },
  (dispatch) => {
    return {
      handleGetItems: () => dispatch(getItems())
    }
  }
)(ItemsContainer)
