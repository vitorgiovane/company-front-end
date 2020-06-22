import React, { useRef, useCallback } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { KeyboardArrowRight } from '@styled-icons/material-outlined'
import { Twitter, Linkedin } from '@styled-icons/entypo-social'
import { Facebook, Google } from '@styled-icons/boxicons-logos'

import { useAuth, SignInCredentials } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'

import logo from '../../assets/logo.png'

import { Container, AlternativeLogin } from './styles'
import Input from '../../components/Input'
import Button from '../../components/Button'

const SignIn: React.FC = () => {
  const formReference = useRef<FormHandles>(null)

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async ({ email, password }: SignInCredentials) => {
      try {
        formReference.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Enter a valid e-mail'),
          password: Yup.string().required('Password is required')
        })

        await schema.validate(
          { email, password },
          {
            abortEarly: false
          }
        )

        await signIn({ email, password })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formReference.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Invalid credentials',
          description: 'Enter a valid combination of credentials'
        })
      }
    },
    [signIn, addToast]
  )

  const history = useHistory()
  const handleRegister = () => {
    history.push('/signup')
  }

  return (
    <Container>
      <img src={logo} alt="Company" />
      <Form ref={formReference} onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Login"
          themeColor="#2f80ed"
          placeholder="Insira o seu e-mail"
        />
        <Input
          name="password"
          label="Senha"
          themeColor="#2f80ed"
          type="password"
          placeholder="Insira a sua senha"
        />
        <Button backgroundColor="#2f80ed" type="submit">
          LOGIN
        </Button>
        <a href="/">
          Esqueci minha senha <KeyboardArrowRight size={21} />
        </a>
      </Form>
      <AlternativeLogin>
        <span>Faça seu login usando</span>
        <div>
          <a href="/">
            <Facebook size={30} color="#000" />
          </a>
          <a href="/">
            <Twitter size={26} color="#000" />
          </a>
          <a href="/">
            <Linkedin size={18} color="#000" />
          </a>
          <a href="/">
            <Google size={27} color="#000" />
          </a>
        </div>
        <Button
          onClick={handleRegister}
          backgroundColor="#000"
          borderColor="#2f80ed"
        >
          NÃO TENHO LOGIN
        </Button>
        <a href="/">CENTRAL DE AJUDA</a>
      </AlternativeLogin>
    </Container>
  )
}

export default SignIn
