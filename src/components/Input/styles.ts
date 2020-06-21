import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  themeColor: string
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  padding: 8px 8px 6px 8px;
  margin-bottom: 1rem;
  border-radius: 20px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  color: #5d7184;
  border: 1px solid transparent;
  transition: background-color 0.2s;

  ${(props) =>
    props.isFilled &&
    css`
      color: ${props.themeColor};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${props.themeColor};
      background-color: #fff;
    `}

  span {
    color: #2f80ed;
    display: block;
    font-weight: 700;
    font-size: 13px;
    border: 1px solid 2a004f;

    ${(props) =>
      props.isErrored &&
      css`
        color: #f42626;
      `}
  }

  > div {
    display: flex;
    align-items: center;

    input {
      flex-grow: 1;
      padding: 9px 0 4px 0;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #73777a;
      border-radius: 0%;
      color: ${(props) => props.themeColor};
      font-size: 13px;
      font-weight: 500;
      transition: border-color 0.2s;

      &::placeholder {
        color: #808080;
      }

      ${(props) =>
        props.isFocused &&
        css`
          border-bottom-color: transparent;
        `}
    }

    svg {
      margin-right: 10px;
    }
  }
`

export const Error = styled(Tooltip)`
  margin-right: -10px;

  svg {
    margin: 0 0 0 10px;
    border-radius: 50%;

    box-shadow: 0 0 0 0 rgba(255, 0, 0, 1);
    transform: scale(1);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(244, 38, 38, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(244, 38, 38, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(244, 38, 38, 0);
    }
  }

  span {
    background: #f42626;
    color: #eee;

    &::before {
      border-color: #f42626 transparent;
    }
  }
`
