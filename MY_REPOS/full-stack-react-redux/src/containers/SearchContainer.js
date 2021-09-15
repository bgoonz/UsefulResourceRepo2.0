import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import styled from '@xstyled/emotion'

import { SearchForm, Center, Alert, Items, LoadingSpinner } from '../components'
import { resetSearchItems, searchItems } from '../redux/actions/search'

const ResultsCount = styled.p`
  color: textAlt;
  margin: 10px 0;
`

const SearchContainer = ({
  isLoading,
  error,
  query,
  items,
  handleReset,
  handleSearch
}) => {
  const location = useLocation()
  const history = useHistory()

  // Set default values in the form inputs
  const parsedQuery = queryString.parse(location.search)
  const { register, errors, handleSubmit } = useForm({
    defaultValues: { keyword: parsedQuery.keyword || '' }
  })

  // Parse query in the browser URL using query-string
  // Then search query to the API if there is a keyword
  useEffect(() => {
    handleReset()
    const parsedQuery = queryString.parse(location.search)
    parsedQuery.keyword && handleSearch(parsedQuery)
  }, [handleReset, handleSearch, location])

  // Only redirect with query
  const onSubmit = (data) => {
    history.push({ search: `?keyword=${data.keyword}` })
  }

  return (
    <>
      <SearchForm
        isLoading={isLoading}
        register={register}
        query={query}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />

      <Center>
        {!isLoading && !errors.keyword && (
          <Alert variant='info'>
            Searches across the entire items collection
          </Alert>
        )}
        {isLoading && <LoadingSpinner />}
        {!isLoading && errors.keyword && (
          <Alert>{errors.keyword.message}</Alert>
        )}
      </Center>

      {!isLoading && items && items.length > 0 && (
        <ResultsCount>About {items.length} results</ResultsCount>
      )}

      {!isLoading && items && items.length > 0 && <Items items={items} />}

      {!isLoading && query.keyword && items.length <= 0 && (
        <div>
          <h2>Sorry, no items for "{query.keyword}"</h2>
          <p>
            The term you entered did not bring up any items. You may have
            mistyped your term.
          </p>
        </div>
      )}
    </>
  )
}

SearchContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  query: PropTypes.object,
  items: PropTypes.array,
  handleReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      isLoading: state.search.isLoading,
      error: state.search.error,
      query: state.search.query || {},
      items: state.search.data.items || []
    }
  },
  (dispatch) => {
    return {
      handleReset: (query) => dispatch(resetSearchItems(query)),
      handleSearch: (query) => dispatch(searchItems(query))
      // Remember to pass the data if the function requires it
    }
  }
)(SearchContainer)
