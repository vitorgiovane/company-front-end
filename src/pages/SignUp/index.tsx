import React, { useCallback, useRef } from 'react'
import { Envelope, Lock, User, SignInAlt } from '@styled-icons/fa-solid'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import logo from '../../assets/logo.png'

import { Container, Resume, RegisterBox } from './styles'
import Input from '../../components/Input'
import Button from '../../components/Button'

interface SignUpForm {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formReference = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (userAttributes: SignUpForm) => {
      try {
        formReference.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().min(3, 'Your name must be at least 3 characters'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Enter a valid e-mail'),
          password: Yup.string().min(
            6,
            'Enter a password of at least 6 characters'
          )
        })

        await schema.validate(userAttributes, {
          abortEarly: false
        })

        await api.post('/users', userAttributes)
        addToast({
          type: 'success',
          title: 'User successfully registered',
          description: 'You can now log in to Zeruai.'
        })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formReference.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Registration error',
          description: 'An error occurred during registration. Try again.'
        })
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Resume>
        <img src={logo} alt="Zeruai" />
        <h1>
          Get exclusive access <br />
          to Zeruai
        </h1>
        <h3>
          Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit, sed do
          eiusmod tempor <br />
          incididunt ut labore et dolore.
        </h3>
      </Resume>
      <RegisterBox>
        <h1>Create account</h1>
        <Form ref={formReference} onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Nome"
            themeColor="#f4a40f"
            placeholder="Name"
          />
          <Input
            name="email"
            label="E-mail"
            themeColor="#f4a40f"
            placeholder="E-mail"
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            themeColor="#f4a40f"
            placeholder="Password"
          />
          <Button backgroundColor="#f4a40f" type="submit" icon={SignInAlt}>
            Sign Up
          </Button>
          <Link to="/">
            Already have an account? <strong>Sign In</strong>
          </Link>
        </Form>
      </RegisterBox>
    </Container>
  )
}

export default SignUp
