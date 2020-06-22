import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

import { StyledIconProps } from '@styled-icons/styled-icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<StyledIconProps>
  backgroundColor: string
  borderColor?: string
}

const LittleButton: React.FC<ButtonProps> = ({
  icon: Icon,
  backgroundColor,
  borderColor,
  children,
  ...rest
}) => (
  <Container
    backgroundColor={backgroundColor}
    borderColor={borderColor}
    {...rest}
  >
    {children}
    {Icon && <Icon size={20} />}
  </Container>
)

export default LittleButton
