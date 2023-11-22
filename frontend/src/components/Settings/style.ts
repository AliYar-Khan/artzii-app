import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Container = styled.div`
margin-left: -60px;
margin-right: auto;
width: -webkit-fill-available;
width: -moz-available;
height: 80vh;
position: fixed;
overflow-x: hidden;
padding-top: 10px;
padding-bottom: 10px;
padding-left: 0px;
margin-top: 30px;
background-color: ${Theme.WHITE_COLOR};
`
export const AccountHeading = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  color: ${Theme.BLACK_COLOR};
  background-color: ${Theme.WHITE_COLOR};
`
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 50px;
  overflow-x: hidden;
  background: ${Theme.WHITE_COLOR} !important;
`

export const Flex1 = styled.div`
  width: 200px;
  margin-right: auto;
  margin-left: 50px;
  background: ${Theme.WHITE_COLOR} !important;
`
export const Flex2 = styled.div`
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  background: ${Theme.WHITE_COLOR} !important;
`
export const UpdateButton = styled.button`
  cursor: pointer;
  height: 46px;
  background: ${Theme.WHITE_COLOR};
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  color: ${Theme.BLACK_COLOR};
  width: 66%;
`

export const CancelSubscription = styled.a`
  text-decoration: none;
  color: ${Theme.RED};
  position: absolute;
  width: 225px;
  height: 24px;
  top: calc(50% + 430px);
  left: 100px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
`
