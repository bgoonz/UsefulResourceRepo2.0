import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

import dayjs from 'dayjs'

import { Avatar, Row, Alert } from '../components'

const UserSettingsFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
  width: 100%;
  max-width: 420px;
`

const Form = styled.form`
  width: 100%;
  max-width: 420px;
  & > div {
    margin: 10 0;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10;
  width: 100%;
`

const Label = styled.label``

const Input = styled.input``

const InputFile = styled.input`
  cursor: pointer;
  padding: 10px;
  color: #555;
`

const InputSubmit = styled.input`
  cursor: pointer;
  padding: 10px;
  margin: 10px 0;
  color: #fff;
  font-size: 1.2em;
  font-weight: 700;
  width: 100%;
  background-color: primary;
  border: none;
  &:hover {
    background-color: primaryAlt;
  }
`

const Bio = styled.textarea`
  font-size: 1.2em;
  min-height: 100px;
  max-height: 200px;
  resize: vertical;
`

const Error = styled.span`
  margin-top: 10px;
  color: textError;
`

const UserSettingsForm = ({
  isLoading,
  user,
  register,
  handleSubmit,
  errors,
  submitData
}) => {
  return (
    <UserSettingsFormStyled>
      <Avatar user={user} size={150} />

      <Form onSubmit={handleSubmit(submitData)} encType='multipart/form-data'>
        <Field>
          <Label htmlFor='avatar'>Profile Picture</Label>
          <InputFile
            name='avatar'
            type='file'
            accept='image/jpeg,image/png,image/gif'
            ref={register()}
          />
        </Field>

        <Field>
          <Label htmlFor='name'>Name</Label>
          <Input
            name='name'
            type='text'
            autoComplete='name'
            placeholder='Full Name'
            aria-invalid={errors.name ? 'true' : 'false'}
            ref={register({
              required: 'Sorry, but name is required',
              pattern: {
                value: /^[a-zA-Z\s]*$/i,
                message: 'Please provide a name with only alphabet and space'
              }
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </Field>

        <Field>
          <Label htmlFor='username'>Username</Label>
          <Input
            name='username'
            type='text'
            autoComplete='username'
            placeholder='username'
            aria-invalid={errors.username ? 'true' : 'false'}
            ref={register({
              required: 'Sorry, but username is required',
              pattern: {
                value: /^[a-zA-Z0-9_]*$/i,
                message:
                  'Please provide a username with only alphabet, number, and underscore'
              }
            })}
          />
          {errors.username && <Error>{errors.username.message}</Error>}
        </Field>

        <Field>
          <Label htmlFor='bio'>Bio</Label>
          <Bio
            name='bio'
            aria-invalid={errors.bio ? 'true' : 'false'}
            ref={register()}
          />
          {errors.bio && <Error>{errors.bio.message}</Error>}
        </Field>

        <Field>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            disabled
            name='email'
            type='email'
            autoComplete='email'
            aria-invalid={errors.email ? 'true' : 'false'}
            ref={register({
              required: 'Sorry, but email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Please provide a valid email'
              }
            })}
            placeholder='name@example.com'
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </Field>

        <InputSubmit
          type='submit'
          value={isLoading ? 'Saving Changes' : 'Save Changes'}
          disabled={isLoading}
        />
      </Form>

      <Row>
        <Alert variant='info'>
          Joined {dayjs(user.createdAt).format('D MMMM YYYY')}
        </Alert>
        <Alert variant='info'>
          Updated {dayjs(user.updatedAt).format('D MMMM YYYY')}
        </Alert>
      </Row>
    </UserSettingsFormStyled>
  )
}

UserSettingsForm.propTypes = {
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  submitData: PropTypes.func.isRequired
}

export default UserSettingsForm
