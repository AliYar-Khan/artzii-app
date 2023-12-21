import React, { useState } from 'react'
import {
  Container,
  MainHeading,
  SubHeading,
  CreditButton,
  Center,
  CreditNumber,
  CreditText,
  Button,
  BuyNowButton
} from './style'
import { Badge } from 'antd'
import { toast, ToastContainer } from 'react-toastify'
import { client } from 'src/apiClient/apiClient'
import { useStores } from 'src/store/rootStore'
import 'react-toastify/dist/ReactToastify.css'

const AICredit = (): any => {
  const store = useStores()

  const [credits, setcredits] = useState<any>(0)
  const pricePerCredit = 0.04

  const handleIncrement = (): void => {
    setcredits(credits + 1)
  }

  const onSelectCredits = (num: number): void => {
    setcredits(num)
  }

  const handleDecrement = (): void => {
    setcredits(credits - 1)
  }

  const handleBuyNow = (): void => {
    const dataPOST = JSON.stringify({
      noOfCredits: credits
    })

    client
      .post('/payment-stripe/buy-credits-session', dataPOST, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': store.authStore.authToken
        }
      })
      .then((response) => {
        console.log('====================================')
        console.log('response of subscription --->>>', response)
        console.log('====================================')
        if (response.status === 200) {
          window.location = response.data.url
        }
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          toast.error('Token Expired. Login Again!', {
            style: {
              background: '#FFFFFF',
              color: 'black'
            },
            progressStyle: {
              background: 'black'
            },
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          await store.logout()
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        } else {
          toast.error(err.response.data.message, {
            style: {
              background: '#FFFFFF',
              color: 'black'
            },
            progressStyle: {
              background: 'black'
            },
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
  }

  return (
    <Container>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <Badge
        style={{
          display: 'flex',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '60px'
        }}
      >
        Pricing
      </Badge>
      <MainHeading>Flexible pricing plan for your needs</MainHeading>
      <SubHeading>Expires after a year</SubHeading>
      <Center>
        <CreditButton
          onClick={() => {
            onSelectCredits(300)
          }}
        >
          <CreditNumber>+ 300</CreditNumber>
          <CreditText>credits</CreditText>
        </CreditButton>
        <CreditButton
          onClick={() => {
            onSelectCredits(500)
          }}
        >
          <CreditNumber>+ 500</CreditNumber>
          <CreditText>credits</CreditText>
        </CreditButton>
        <CreditButton
          onClick={() => {
            onSelectCredits(1000)
          }}
        >
          <CreditNumber>+ 1000</CreditNumber>
          <CreditText>credits</CreditText>
        </CreditButton>
      </Center>
      <SubHeading style={{ marginTop: 80 }}>
        <CreditNumber>$ 0.04/</CreditNumber>
        <CreditText>cr</CreditText>
      </SubHeading>
      <Center>
        <Button onClick={handleIncrement}>+</Button>
        <Button onClick={handleDecrement}>-</Button>
      </Center>
      <Center>
        <CreditNumber>{credits}</CreditNumber>
        <CreditText style={{ paddingLeft: 10 }}>credits</CreditText>
      </Center>
      <Center>
        <CreditNumber>
          ${(Math.round(credits * pricePerCredit * 100) / 100).toFixed(2)}
        </CreditNumber>
      </Center>
      <Center style={{ marginLeft: 60 }} onClick={handleBuyNow}>
        <BuyNowButton>Buy Now</BuyNowButton>
      </Center>
    </Container>
  )
}

export default AICredit
