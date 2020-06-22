import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  padding: 4.1em 4em 12em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 192px;
    height: 80px;
    margin-bottom: 8.5em;

    @media only screen and (max-width: 720px) {
      margin-bottom: 2.5em;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 302px;

    > div {
      margin-bottom: 1em;
    }

    input {
      color: #2f80ed;
      font-weight: 400;
      font-size: 14px;

      & + input {
        margin-top: 10px;
      }
    }

    button {
      font-weight: 700;
    }

    a {
      text-transform: uppercase;
      color: #2f80ed;
      font-size: 12.5px;
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      letter-spacing: 1.5px;
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s color;

      &:hover {
        color: ${shade(0.2, '#2f80ed')};
      }
    }
  }
`

export const AlternativeLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4em;
  align-items: center;
  width: 302px;

  > span {
    color: #808080;
    font-weight: 300;
    font-size: 14px;
  }

  > div {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;

    a {
      border-radius: 50%;
      background-color: #fff;
      width: 42px;
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s background-color;

      & + a {
        margin-left: 10px;
      }

      &:hover {
        background-color: ${shade(0.3, '#fff')};
      }
    }
  }

  button {
    font-weight: 700;
  }

  > a {
    text-transform: uppercase;
    color: #2f80ed;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    text-decoration: underline;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    transition: 0.2s color;
    margin-top: 2.5em;
    display: none;

    @media only screen and (max-width: 720px) {
      display: flex;
    }

    &:hover {
      color: ${shade(0.2, '#2f80ed')};
    }
  }
`
