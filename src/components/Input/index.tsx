import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { StyledIconProps } from '@styled-icons/styled-icon'
import { useField } from '@unform/core'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: React.ComponentType<StyledIconProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      {Icon && <Icon size={24} />}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  )
}

export default Input