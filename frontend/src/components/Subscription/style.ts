import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Container = styled.div`
  margin-left: -100px;
  margin-right: auto;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 76vh;
  position: fixed;
  overflow-x: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 0px;
  background: white;
  display: flex;
  flex-direction: column;
`

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    background-color: white;
`

export const CancelSubscription = styled.a`
  text-decoration: none;
  color: ${Theme.RED};
  position: relative;
  width: auto;
  height: 24px;
  top: calc(5% + 30px);
  margin-left: auto;
  margin-right: auto;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
`

export const YesButton = styled.button`
  cursor: pointer;
  height: 46px;
  background: ${Theme.WHITE_COLOR};
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border: none !important;
  color: ${Theme.BLACK_COLOR};
  width: 100px;
  margin-right: 10px !important;
`

export const NoButton = styled.button`
  cursor: pointer;
  height: 46px;
  background: ${Theme.WHITE_COLOR};
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border: none !important;
  color: ${Theme.BLACK_COLOR};
  width: 100px;
  margin-left: 10px !important;
`
