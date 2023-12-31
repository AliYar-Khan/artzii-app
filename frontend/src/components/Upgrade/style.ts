import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Container = styled.div`
  margin-left: -100px;
  margin-right: auto;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 80vh;
  position: fixed;
  overflow-x: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 0px;
  margin-top: 20px;
`

export const MainHeading = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  color: ${Theme.BLACK_COLOR};
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  overflow-x: hidden;
`

export const Flex1 = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
`
export const Flex2 = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const AccessButton = styled.button`
  width: -webkit-fill-available;
  width: -moz-available;
  height: 50px;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #ff8ea5, #cc95ff, #88e7ff) border-box;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.12);
  color: ${Theme.BLACK_COLOR};
  margin-bottom: 15px;
  cursor: pointer;
  font-weight: bold;
`

export const CancelSubscription = styled.a`
  text-decoration: none;
  color: ${Theme.RED};
  position: absolute;
  width: 225px;
  height: 24px;
  top: calc(12%);
  right: 100px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ManageSubscription = styled.a`
  text-decoration: none;
  color: ${Theme.BLACK_COLOR};
  position: absolute;
  width: 200px;
  height: 50px;
  top: calc(10%);
  left: 100px;
  font-family: 'Poppins';
  font-style: normal;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.12);
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const Billed = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: -35px;
`
export const MonthlyHeading = styled.h1<{ color: string }>`
  font-size: 16px;
  margin-right: 15px;
  color: ${(prop) => prop.color};
`

export const AnnualHeading = styled.h1<{ color: string }>`
  font-size: 16px;
  margin-left: 15px;
  color: ${(prop) => prop.color};
`

export const CardHeading = styled.h1`
  font-size: 30px;
  text-align: center;
  background-color: white;
`
export const CardDescription = styled.h3`
  text-align: center;
  background-color: white;
  color: rgba(0, 0, 0, 0.25);
  font-size: 16px;
`
export const PricingImage = styled.img`
  width: 210px;
  height: 90px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
`

export const CardFeatures = styled.p`
  display: flex;
  align-items: center;
  background-color: white;
`
export const CurrentPlanHeading = styled.p`
  font-size: 12px;
  text-align: center;
  transform: rotate(-8.8deg);
`

export const AnnualPrice = styled.p`
  font-size: 12px;
  text-align: center;
  font-family: Poppins;
  font-style: italic;
  color: #121212;
`
