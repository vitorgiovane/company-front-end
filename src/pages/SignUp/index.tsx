import React, { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import cpfMask from '../../utils/cpfMask'
import phoneMask from '../../utils/phoneMask'
import logo from '../../assets/logo.png'

import { Container } from './styles'
import Input from '../../components/Input'
import Button from '../../components/Button'
import LitteButton from '../../components/LittleButton'
import Select from '../../components/Select'

interface SignUpForm {
  name: string
  email: string
  password: string
  gender: string
  phone: string
  country: string
  cpf: string
  newsletter: boolean
}

const SignUp: React.FC = () => {
  const formReference = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const [newsletter, setNewsletter] = useState(true)
  const [treatedCpf, setTreatedCpf] = useState('')
  const [treatedPhone, setTreatedPhone] = useState('')

  const enableNewsletter = () => {
    setNewsletter(true)
  }

  const disableNewsletter = () => {
    setNewsletter(false)
  }

  const genderOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Feminino' }
  ]

  const countryOptions = [
    { value: 'BR', label: 'Brasil' },
    { value: 'US', label: 'Estados Unidos da América' },
    { value: 'IT', label: 'Itália' }
  ]

  const handleCpf = useCallback((value) => {
    setTreatedCpf(cpfMask(value))
  }, [])

  const handleSelect = useCallback(() => {
    console.log('Vitor')
  }, [])

  const handlePhone = useCallback((value) => {
    setTreatedPhone(phoneMask(value))
  }, [])

  const handleSubmit = useCallback(
    async (userAttributes: SignUpForm) => {
      userAttributes.newsletter = newsletter
      try {
        formReference.current?.setErrors({})

        const phoneRegExp = /^(?:(?:\+|00)?(\d{2})\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/
        const nameRegExp = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i
        const schema = Yup.object().shape({
          name: Yup.string()
            .min(3, 'Seu nome deve ter pelo menos 3 caracteres')
            .matches(
              nameRegExp,
              'Nome inválido! Insira um nome completo e sem símbolos. (Acentos e pontos são permitidos)'
            ),
          email: Yup.string()
            .required('O e-mail é obrigatório')
            .email('Insira um e-mail válido'),
          password: Yup.string().min(
            6,
            'Insira uma senha com pelo menos 6 caracteres'
          ),
          passwordConfirmation: Yup.string().test(
            'passwords-match',
            'A senha e a confirmação de senha não correspondem.',
            function (value) {
              return this.parent.password === value
            }
          ),
          phone: Yup.string().matches(
            phoneRegExp,
            'Informe um telefone com o código do país e o DDD. Ex.: +55 41 99999-9999'
          ),
          cpf: Yup.string().min(
            11,
            'Um CPF válido contém pelos menos 11 caracteres'
          )
        })

        await schema.validate(userAttributes, {
          abortEarly: false
        })

        await api.post('/users', userAttributes)
        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso',
          description: 'Você agora pode fazer login no Company.'
        })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formReference.current?.setErrors(errors)
          return
        }

        if (error?.response?.data?.message) {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: error.response.data.message
          })
          return
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro durando o cadastro. Tente novamente.'
        })
      }
    },
    [addToast, history, newsletter]
  )

  return (
    <Container>
      <img src={logo} alt="Company" />
      <Form ref={formReference} onSubmit={handleSubmit}>
        <h1>Conclua seu Cadastro</h1>
        <p>
          Preencha o formulário para
          <br />
          criar o seu login
        </p>
        <Input
          name="name"
          label="Nome"
          themeColor="#ffffff"
          placeholder="Nome Completo"
        />
        <Input
          name="email"
          label="E-mail"
          themeColor="#ffffff"
          placeholder="Seu e-mail"
        />
        <Input
          name="password"
          type="password"
          label="Senha"
          themeColor="#ffffff"
          placeholder="Sua senha"
        />
        <Input
          name="passwordConfirmation"
          type="password"
          label="Confirmar senha"
          themeColor="#ffffff"
          placeholder="Insira novamente sua senha"
        />
        <div className="select">
          <span>Gênero</span>
          <Select
            name="gender"
            defaultValue={{ value: 'male', label: 'Masculino' }}
            options={genderOptions}
          />
        </div>
        <Input
          name="phone"
          label="Telefone"
          themeColor="#ffffff"
          placeholder="Insira seu telefone com DDD"
          onChange={(event) => handlePhone(event.target.value)}
          value={treatedPhone}
        />
        <div className="select">
          <span>País</span>
          <Select
            name="country"
            defaultValue={{ value: 'BR', label: 'Brasil' }}
            options={countryOptions}
          />
        </div>
        <Input
          name="cpf"
          label="Número de CPF"
          themeColor="#ffffff"
          placeholder="Insira o número do CPF"
          onChange={(event) => handleCpf(event.target.value)}
          value={treatedCpf}
        />

        <div className="newsletter">
          <h2>Deseja receber nossa newsletter?</h2>
          <LitteButton onClick={enableNewsletter} active={newsletter}>
            Sim
          </LitteButton>
          <LitteButton onClick={disableNewsletter} active={!newsletter}>
            Não
          </LitteButton>
        </div>

        <Button backgroundColor="#2f80ed" type="submit">
          COMEÇAR
        </Button>
      </Form>
    </Container>
  )
}

export default SignUp
