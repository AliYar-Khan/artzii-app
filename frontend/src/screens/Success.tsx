import React, { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useStores } from 'src/store/rootStore'
import { Container, SuccessMessage } from './style'
import { client } from 'src/apiClient/apiClient'
import { toast } from 'react-toastify'
import queryString from 'query-string'
import 'react-toastify/dist/ReactToastify.css'

const Success = (): JSX.Element => {
  const initialized = useRef(false)
  const store = useStores()
  const parsed = queryString.parse(window.location.search)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      let url = ''
      if (!parsed.aicredits) {
        url = '/payment-stripe/payment-success'
      } else {
        url = '/payment-stripe/payment-success-credits'
      }
      client
        .post(url, JSON.stringify({ credits: parsed.aicredits }), {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': store.authStore.authToken
          }
        })
        .then((response) => {
          if (response.status === 200 && response.data.success === true) {
            setTimeout(() => {
              window.location.href = '/dashboard'
            }, 2000)
          } else {
            toast.error('Something went wrong', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            })
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed])

  if (
    store.authStore.initialize === true &&
    (store.authStore.authToken === null ||
      store.authStore.authToken === undefined ||
      store.authStore.authToken === '')
  ) {
    return <Navigate to='/' replace />
  }
  return (
    <Container>
      <SuccessMessage>Payment Successful</SuccessMessage>
    </Container>
  )
}

export default Success
