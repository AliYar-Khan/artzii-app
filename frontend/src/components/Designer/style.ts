import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Container = styled.div`
  margin-left: -53px;
  margin-right: auto;
  top: 45px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 0px;
  display: flex;
  flex-direction: row;
  position: fixed;
`

export const SaveButton = styled.button`
  width: 80px;
  height: 25px;
  background: #ffffff;
  box-shadow: 0px 4px 4px #bdf4ff;
  border-radius: 4px;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  color: ${Theme.BLACK_COLOR};
  margin-top: 0px;
  cursor: pointer;
  position: absolute;
  left: 580px;
  font-size: 12px;
  outline: transparent;
`

export const InputContainer = styled.input`
  cursor: pointer;
  height: 30px;
  width: 110px;
  background: #ffffff;
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
  margin-top: 0px;
  cursor: pointer;
  position: absolute;
  left: 53%;
  outline: transparent;
`
export const SectionTab = styled.div`
    display: flex,
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
