import React from 'react'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'
import LocalizedLink from '../LocalizedLink'

const Categories = ({ categories }) => (
  <>
    {categories.map((cat, i) => (
      <React.Fragment key={cat}>
        {!!i && ', '}
        <LocalizedLink to={`/categories/${kebabCase(cat)}`}>{cat}</LocalizedLink>
      </React.Fragment>
    ))}
  </>
)

export default Categories

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}
