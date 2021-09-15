import React from 'react'
import PropTypes from 'prop-types'

import { ItemDetail } from '../components'

const ItemContainer = ({ item }) => {
  return <ItemDetail item={item} />
}

ItemContainer.propTypes = {
  item: PropTypes.object
}

export default ItemContainer
