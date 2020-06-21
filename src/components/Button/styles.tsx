import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  backgroundColor: string
  borderColor?: string
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5em;
  align-self: center;
  padding: 16px 60px;
  border-radius: 20px;
  background: ${(props) => props.backgroundColor};
  font-weight: 500;
  font-size: 16px;
  transition: background-color linear 0.2s, border-color linear 0.2s;
  width: calc(100% - 20px);
  border: 1px solid #2a004f;
  padding: 20px 0;
  letter-spacing: 1.5px;
  font-size: 14px;
  font-weight: 600;
  color: #f8f9f9;

  ${(props) =>
    props.borderColor &&
    css`
      border: 1px solid ${props.borderColor};
    `}

  &:hover {
    background: ${(props) =>
      props.backgroundColor && shade(0.2, props.backgroundColor)};

    ${(props) =>
      props.borderColor &&
      css`
        border-color: ${props.borderColor && shade(0.5, props.borderColor)};
      `}
  }

  svg {
    margin-left: 10px;
  }
`
