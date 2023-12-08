import React, { useState } from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { Checkbox, Form, Input } from 'antd'
import '../../utils/style.css'
import { useGoogleLogin } from '@react-oauth/google'
import {
  Container,
  GoogleSigninBtn,
  Grids,
  LoginButton,
  SignUpPara
} from './style'
import GoogleIcon from '../../assets/google.png'
import Header from '../Header'
import { Navigate, useNavigate } from 'react-router-dom'
import Theme from '../../constants/theme'
import { client } from '../../apiClient/apiClient'
import { useStores } from 'src/store/rootStore'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = (): JSX.Element => {
  const store = useStores()
  const [googleClicked, setGoogleClicked] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  const onFinish = (values: any): void => {
    if (googleClicked) return
    console.log('Received values of form: ', values)
    const data = JSON.stringify({
      email: values.username,
      password: values.password,
      remember: values.remember
    })

    client
      .post('/users/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        async (response: {
          data: {
            user: any
            success: boolean
            message: string
            token: string
            redirect: string
          }
        }) => {
          if (response.data.success) {
            await store.authStore.update('authToken', response.data.token)
            await store.authStore.update('user', response.data.user)
            toast.success('Logged in success. Redirecting', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            })
            setTimeout(() => {
              handleNavigation(response.data.redirect)
            }, 2000)
          } else {
            console.log('====================================')
            console.log('response.data --->>', response.data)
            console.log('====================================')
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_RIGHT
            })
          }
        }
      )
      .catch((error) => {
        console.log('====================================')
        console.log('error --->>>', error.response.data.message)
        console.log('====================================')
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
  }
  const navigate = useNavigate()

  const handleGoogleLoginSuccess = (tokenResponse: {
    access_token: any
  }): void => {
    const accessToken = tokenResponse.access_token

    client
      .post('/users/googleSignIn?gat=' + accessToken)
      .then(
        async (response: {
          data: { user: any; success: boolean; token: string; redirect: string }
        }) => {
          console.log('====================================')
          console.log('googleSignIn ------>>>>', response)
          console.log('====================================')
          if (response.data.success) {
            await store.authStore.update('authToken', response.data.token)
            await store.authStore.update('user', response.data.user)
            toast.success('Logged in success. Redirecting', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            })
            setTimeout(() => {
              handleNavigation(response.data.redirect)
            }, 2000)
          }
        }
      )
      .catch((error) => {
        toast.error(error.response.data.message, {
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
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess })

  const handleNavigation = (path: string): void => {
    navigate(`${path}`)
  }

  if (
    store.authStore.authToken !== null &&
    store.authStore.authToken !== undefined &&
    store.authStore.authToken === ''
  ) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <>
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
      <Header
        handleSettingsClick={() => {}}
        handleUpgradeClick={() => {}}
        handleAICreditClick={() => {}}
      />
      <Container>
        <Form
          name='google_login'
          className='google-form'
          onFinish={() => {}}
          style={{ backgroundColor: 'white' }}
        >
          <Form.Item>
            <Grids>
              <GoogleSigninBtn
                onClick={() => {
                  setGoogleClicked(true)
                  login()
                }}
              >
                <img
                  src={GoogleIcon}
                  alt='google icon'
                  style={{ marginRight: '10px' }}
                />
                Sign in with Google
              </GoogleSigninBtn>
            </Grids>
          </Form.Item>
        </Form>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ backgroundColor: 'white' }}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: !googleClicked,
                message: 'Please input your Username!'
              }
            ]}
          >
            <Input placeholder='email' className='inputField' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: !googleClicked,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='inputField'
              suffix={
                showPassword ? (
                  <EyeInvisibleFilled
                    style={{
                      color: `${Theme.GREY_COLOR}`,
                      background: `${Theme.WHITE_COLOR} !important`
                    }}
                    onClick={handleClickShowPassword}
                  />
                ) : (
                  <EyeFilled
                    style={{ color: `${Theme.GREY_COLOR}` }}
                    onClick={handleClickShowPassword}
                  />
                )
              }
            />
          </Form.Item>
          <Form.Item style={{ marginTop: '-10px', marginBottom: '30px' }}>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox className='checkbox'>Remember me</Checkbox>
            </Form.Item>

            <a
              className='login-form-forgot'
              href='#/'
              style={{
                position: 'absolute',
                right: 0,
                color: 'rgb(183 108 145)'
              }}
            >
              Forgot your password?
            </a>
          </Form.Item>

          <Form.Item>
            <Grids>
              <LoginButton type='submit'>Login</LoginButton>
              <SignUpPara>
                Need an account?{' '}
                <a href='/signup' rel='noreferrer' className='signupButton'>
                  sign-up here
                </a>
              </SignUpPara>
            </Grids>
          </Form.Item>
        </Form>
      </Container>
    </>
  )
}

export default Login
