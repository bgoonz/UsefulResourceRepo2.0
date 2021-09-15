import React from 'react'
import PropTypes from 'prop-types'

const InputNumber = (props = {}) => {
  const {
    handleChange = () => {},
    ...otherProps
  } = props
  
  const onKeyDown = (e = {}) => {
    const {
      ctrlKey,
      metaKey,
      key = '',
      target = {}
    } = e
    
    const { type } = target

    if (
      !ctrlKey &&
      !metaKey &&
      type === 'number' &&
      key.length === 1 &&
      (/[^0-9.]/g).test(key)
    ) {
      e.preventDefault()
    }
  }

  const onChange = (e = {}) => {
    const { target = {} } = e

    const {
      maxLength,
      name,
      value = ''
    } = target

    let newValue = value

    if (
      newValue &&
      maxLength &&
      newValue.length > maxLength
    ) {
      newValue = newValue.slice(0, maxLength)
      target.value = newValue
    }

    handleChange(name, newValue)
  }

  return (
    <input
      {...otherProps}
      type='number'
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  )
}

InputNumber.propTypes = {
  handleChange: PropTypes.func 
}

export default InputNumber