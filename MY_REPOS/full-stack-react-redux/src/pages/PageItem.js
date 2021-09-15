import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { ItemContainer } from '../containers'
import { Page, Center, NotFound, LoadingSpinner } from '../components'
import { getItem } from '../redux/actions/item'

const PageUserProfile = ({ isLoading, item, handleGetItem }) => {
  const { slug } = useParams()

  useEffect(() => {
    handleGetItem(slug)
  }, [handleGetItem, slug])

  return (
    <Page
      title={
        (isLoading && slug) ||
        (!isLoading && item && item.title) ||
        (!isLoading && !item && 'Item Not Found')
      }
    >
      <Center>
        {isLoading && <LoadingSpinner />}
        {!isLoading && item && <ItemContainer item={item} />}
        {!isLoading && !item && <NotFound />}
      </Center>
    </Page>
  )
}

PageUserProfile.propTypes = {
  isLoading: PropTypes.bool,
  item: PropTypes.object,
  handleGetItem: PropTypes.func
}

export default connect(
  (state) => {
    return {
      isLoading: state.item.isLoading,
      item: state.item.data || {}
    }
  },
  (dispatch) => {
    return {
      handleGetItem: (slug) => dispatch(getItem(slug))
    }
  }
)(PageUserProfile)
