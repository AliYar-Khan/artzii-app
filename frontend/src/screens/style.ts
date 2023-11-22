import styled from 'styled-components'
// import Theme from '../constants/theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`

export const SuccessMessage = styled.h1`
  font-size: 2rem;
  color: #00cc00;
`

export const FailedMessage = styled.h1`
  font-size: 2rem;
  color: #ff0000;
`
