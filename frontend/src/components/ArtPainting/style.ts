import styled from 'styled-components'
// import Theme from '../../constants/theme'

export const Container = styled.div`
  margin-left: -100px;
  margin-right: auto;
  margin-top: 40px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: auto;
  position: fixed;
  overflow-x: hidden;
  padding-top: 50px;
  padding-bottom:50px;
  padding-left: 0px;
  display: flex;
  flex-direction: row;
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
`

export const Flex1 = styled.div`
  width: auto;
`
export const Flex2 = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
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

export const Eraser = styled.div`
    width: 110px;
    height: 100px;
    position: absolute;
    left: 380px;
    top: 10px;
    border: 1px solid;
    background: white;
    border-image: linear-gradient(
        90deg,
        rgba(255, 142, 165, 0.87) 25.21%,
        rgba(204, 149, 255, 0.87) 51.28%,
        rgba(136, 231, 255, 0.87) 75.62%
      )
      1 !important;
    border-radius: 4px;
`
