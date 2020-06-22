import React, { useEffect } from 'react'
import {
  Times,
  InfoCircle,
  CheckCircle,
  ExclamationCircle
} from '@styled-icons/fa-solid'

import { ToastMessage, useToast } from '../../../hooks/toast'

import { Container } from './styles'

interface ToastProps {
  message: ToastMessage
  style: object
}

const icons = {
  info: <InfoCircle size={24} />,
  success: <CheckCircle size={24} />,
  error: <ExclamationCircle size={24} />
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const toastLifeTime = 4000
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, toastLifeTime)

    return () => {
      clearTimeout(timer)
    }
  }, [message.id, removeToast])

  return (
    <Container type={message.type} style={style}>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <Times size={18} />
      </button>
    </Container>
  )
}

export default Toast
