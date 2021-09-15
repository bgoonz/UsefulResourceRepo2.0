import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

import { Button } from '../components'
import { IconSearch } from '../components/icons'

const Form = styled.form`
  width: 100%;
  display: flex;
`

const InputText = styled.input`
  flex: 1;
  margin-right: 10px;
  width: 100%;
`

const SearchButton = styled(Button)``

const SearchForm = ({
  isLoading,
  register,
  query,
  handleReset,
  handleSubmit,
  onSubmit
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          id='keyword'
          name='keyword'
          type='text'
          autoFocus={true}
          ref={register({
            required: 'Please enter a proper keyword',
            minLength: 1,
            maxLength: 100
          })}
        />
        <SearchButton type='submit' variant='secondary'>
          <IconSearch width='1em' />
        </SearchButton>
      </Form>
    </>
  )
}

SearchForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  query: PropTypes.object,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SearchForm
