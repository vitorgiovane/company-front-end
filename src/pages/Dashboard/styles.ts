import styled, { css } from 'styled-components'
import { shade, lighten } from 'polished'

export const Container = styled.div``

export const TopBar = styled.div`
  width: 100%;
  height: 100px;
  background-color: #222;
  display: flex;
  justify-content: space-between;
  padding: 0 6%;
  align-items: center;

  > img {
    height: 52px;
  }

  > h1 {
    color: #eee;
    font-size: 20px;
    font-weight: 700;
  }

  > div {
    color: #eee;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#eee')};
    }

    span {
      margin-right: 10px;
      font-size: 14px;
      font-weight: 600;
    }
  }
`

interface MenuProps {
  visible: boolean
}

export const Menu = styled.ul<MenuProps>`
  position: absolute;
  right: 4%;
  top: 44px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;

  opacity: 0;
  visibility: hidden;
  transition: visibility 0.4s ease, opacity 0.4s ease;

  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      visibility: visible;
    `}

  li {
    color: #ccc;
    list-style: none;
    padding: 18.5px 30px;
    font-size: 14px;

    & + li {
      padding: 0;
    }

    button {
      background-color: #222;
      display: block;
      border: none;
      width: 100%;
      padding: 20px 30px;
      color: #eee;
      font-size: 14px;
      font-weight: 600;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;

      &:hover {
        background-color: ${lighten(0.2, '#222')};
      }
    }
  }
`

export const Content = styled.div`
  width: 100%;
  padding: 0 6%;
  display: flex;
  justify-content: space-between;
  margin: 2em 0;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
  }
`

export const Plan = styled.div`
  background: #fff;
  max-width: 32%;
  height: 100%;
  padding: 40px 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 720px) {
    max-width: unset;

    & + div {
      margin-top: 1em;
    }
  }

  h1 {
    font-size: 28px;
    color: #263648;
    text-align: center;
    font-weight: 500;
    margin-bottom: 1em;
  }

  p {
    color: #263648;
    font-size: 18px;
    text-align: center;
    margin-bottom: 2em;
  }

  button {
    background-color: #2f80ed;
    border: none;
    margin: auto;
    padding: 16px 30px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }
`
