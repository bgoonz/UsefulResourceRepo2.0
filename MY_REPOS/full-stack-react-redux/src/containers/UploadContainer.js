import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from '@xstyled/emotion'

import { Buttons, Button, SyntaxBlock } from '../components'
import { uploadImage } from '../redux/actions/images'

const UploadArea = styled.div`
  margin-bottom: 10px;
`

const UploadInput = styled.input`
  cursor: pointer;
  color: #555;
`

const UploadContainer = ({ isLoading, error, data, handleUploadImage }) => {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (body) => {
    handleUploadImage(body)
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UploadArea>
          <UploadInput
            name='image'
            type='file'
            accept='image/jpeg,image/png,image/gif'
            ref={register}
          />
          <aside>
            <small>JPG, GIF, or PNG. Max size of 500 KB</small>
          </aside>
        </UploadArea>

        <Buttons>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </Buttons>
      </form>

      <SyntaxBlock data={data || error} />
    </>
  )
}

UploadContainer.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
  handleUploadImage: PropTypes.func
}

export default connect(
  (state) => {
    return {
      isLoading: state.images.isLoading || false,
      error: state.images.error || {},
      data: state.images.data || {}
    }
  },
  (dispatch) => {
    return {
      handleUploadImage: (data) => dispatch(uploadImage(data))
      // Remember to pass the data if the function requires it
    }
  }
)(UploadContainer)
