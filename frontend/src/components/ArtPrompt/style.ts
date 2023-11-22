import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Container = styled.div`
  margin-left: -100px;
  margin-right: auto;
  margin-top: 50px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: auto;
  position: fixed;
  overflow-x: hidden;
  padding-top: 20px;
  padding-bottom:20px;
  padding-left: 0px;
  background: white;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
  overflow-x: hidden;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 950px;
  background: ${Theme.WHITE_COLOR} !important;
`

export const Flex1 = styled.div`
  width: auto;
  background: ${Theme.WHITE_COLOR} !important;
`
export const Flex2 = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  background: ${Theme.WHITE_COLOR} !important;
`

export const Para = styled.p`
    font-size: 17px;
    text-align: left;
    background-color: ${Theme.WHITE_COLOR};
    width: 700px;
`

export const MessageContainer = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100px;
  z-index: -100;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom:0;
  margin-left: -56px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-left: 200px;
  padding-right: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  left:0px;
`

export const Image = styled.img`
    width: 500px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    height: 300px;
`
