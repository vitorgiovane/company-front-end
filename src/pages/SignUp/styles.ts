import styled from 'styled-components'

interface ContainerProps {
  active?: boolean
}

export const Container = styled.div<ContainerProps>`
  padding: 4.1em 4em 12em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 192px;
    height: 80px;
    margin-bottom: 3em;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 302px;
    margin-left: 130px;

    @media only screen and (max-width: 720px) {
      margin: auto;
    }

    > h1 {
      font-size: 17px;
      margin-bottom: 2em;
      font-weight: 700;
      padding: 0 8px;
    }

    > p {
      font-size: 13px;
      margin-bottom: 2em;
      font-weight: 300;
      padding: 0 8px;
    }

    .newsletter {
      padding: 0 8px;
      margin: 1em 0 3em;

      h2 {
        font-weight: 700;
        font-size: 13px;
        margin-bottom: 1em;
      }
    }

    .select {
      padding: 0 10px;
      margin-bottom: 1rem;

      span {
        font-weight: 700;
        font-size: 13px;
      }

      .react-select__control {
        background-color: #000;
        border: none;
        border-bottom: 1px solid #73777a;
        border-radius: 0;
        box-shadow: none;
      }

      .react-select__menu {
        background-color: #fff;

        .react-select__option {
          color: #000;
          font-size: 13px;
        }
      }

      .react-select__value-container {
        font-size: 13px;
        padding: 0;

        .react-select__single-value {
          color: #2f80ed;
        }
      }

      .react-select__indicator-separator {
        display: none;
      }

      .react-select__indicator {
        color: #fff;
      }
    }
  }
`
