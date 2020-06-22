import styled, { css } from 'styled-components'

interface ContainerProps {
  active?: boolean
}

export const Container = styled.button<ContainerProps>`
  border-radius: 20px;
  font-size: 13.5px;
  transition: background-color linear 0.2s, border-color linear 0.2s;
  padding: 5px 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  color: #fff;
  border-radius: 30px;
  border: 1px solid #2f80ed;
  background-color: #000;
  transition: 0.2s opacity;

  & + button {
    margin-left: 10px;
  }

  ${(props) =>
    props.active &&
    css`
      border-color: #2a004f;
      background-color: #2f80ed;
    `}

  &:hover {
    opacity: 0.6;
  }
`
