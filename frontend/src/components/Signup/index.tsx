import React, { useState } from 'react'
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons'
import { Form, Input } from 'antd'
import '../../utils/style.css'
import {
  Container,
  GoogleSigninBtn,
  Grids,
  SignupButton,
  SignUpPara
} from './style'
import GoogleIcon from '../../assets/google.png'
import Header from '../Header'
import Theme from '../../constants/theme'
import { useNavigate } from 'react-router-dom'
import { client } from '../../apiClient/apiClient'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGoogleLogin } from '@react-oauth/google'

const Signup = (): JSX.Element => {
  const navigate = useNavigate()
  const [googleClicked, setGoogleClicked] = useState(false)

  const onFinish = (values: any): void => {
    if (googleClicked) return
    const data = JSON.stringify({
      name: values.fullname,
      email: values.username,
      password: values.password
    })
    client
      .post('/users/register', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        if (response.data.success) {
          toast.success('Success', {
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
            navigate('/')
          }, 2000)
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

  const handleNavigation = (path: string): void => {
    navigate(`${path}`)
  }

  const handleGoogleSignUpSuccess = (tokenResponse: {
    access_token: any
  }): void => {
    const accessToken = tokenResponse.access_token

    client
      .post('/users/googleSignUp?gat=' + accessToken)
      .then(
        async (response: {
          data: { success: boolean; redirect: string; message: string }
        }) => {
          console.log('====================================')
          console.log('googleSignIn ------>>>>', response)
          console.log('====================================')
          if (response.data.success) {
            toast.success(response.data.message, {
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
  const login = useGoogleLogin({ onSuccess: handleGoogleSignUpSuccess })

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  const handleClickShowPasswordConfirm = (): void => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }
  return (
    <>
      <Header
        handleSettingsClick={() => {}}
        handleUpgradeClick={() => {}}
        handleAICreditClick={() => {}}
      />
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
      <Container>
        <Form
          name='google_signup'
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
                Sign up with Google
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
            name='fullname'
            rules={[
              { required: true, message: 'Please input your full name!' }
            ]}
          >
            <Input placeholder='Name' className='inputField' />
          </Form.Item>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input placeholder='email' className='inputField' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='inputField'
              suffix={
                showPassword ? (
                  <EyeInvisibleFilled
                    style={{ color: `${Theme.GREY_COLOR}` }}
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
          <Form.Item
            name='confirmpassword'
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
                  )
                }
              })
            ]}
          >
            <Input
              type={showPasswordConfirm ? 'text' : 'password'}
              placeholder='Confirm Password'
              className='inputField'
              suffix={
                showPasswordConfirm ? (
                  <EyeInvisibleFilled
                    style={{ color: `${Theme.GREY_COLOR}` }}
                    onClick={handleClickShowPasswordConfirm}
                  />
                ) : (
                  <EyeFilled
                    style={{ color: `${Theme.GREY_COLOR}` }}
                    onClick={handleClickShowPasswordConfirm}
                  />
                )
              }
            />
          </Form.Item>

          <Form.Item>
            <Grids>
              <SignupButton onClick={() => setGoogleClicked(false)}>
                Sign up
              </SignupButton>
              <SignUpPara>
                Already have an account?{' '}
                <a href='/' className='signupButton'>
                  Log-in here
                </a>
              </SignUpPara>
            </Grids>
          </Form.Item>
        </Form>
      </Container>
    </>
  )
}

export default Signup
