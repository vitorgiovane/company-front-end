import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const Button: React.FC<ButtonProps> = ({ active, children, ...rest }) => (
  <Container active={active} {...rest} type="button">
    {children}
  </Container>
)

export default Button
