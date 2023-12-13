import React from 'react'
import {
  MainHeading,
  FlexContainer,
  Flex2,
  CardDescription,
  CardFeatures,
  CardHeading,
  PricingImage,
  AnnualPrice,
  AccessButton
} from './style'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Badge, Card } from 'antd'
import { pricingData } from '../services/PricingData'

import CheckBox from '../assets/Checkbox.png'

interface Props {
  setGettingStarted: any
  setPackagePrice: any
}

const Subscription = ({
  setGettingStarted,
  setPackagePrice
}: Props): JSX.Element => {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={4000}
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
          width: '60px',
          marginTop: '50px'
        }}
      >
        Pricing
      </Badge>
      <MainHeading>Flexible pricing plan for your needs</MainHeading>
      <FlexContainer>
        <Flex2>
          {pricingData.map((item) => (
            <div
              key={item.id}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Card
                style={{
                  width: 300,
                  height: '590px',
                  background: 'white !important',
                  boxShadow: '0px 1px 30px rgba(0, 0, 0, 0.12)',
                  borderRadius: '6px',
                  marginTop: '10px'
                }}
              >
                <CardHeading>{item.title}</CardHeading>
                <CardDescription>{item.description}</CardDescription>
                <PricingImage src={item.monthlyPrice} alt='monthly price' />
                <AnnualPrice>{item.annualPriceText}</AnnualPrice>
                <AccessButton
                  onClick={() => {
                    if (item.monthlyPriceValue.length > 0) {
                      setGettingStarted(false)
                      setPackagePrice(item.monthlyPriceValue)
                    }
                  }}
                >
                  Get Started
                </AccessButton>
                <CardFeatures>
                  <img
                    style={{ background: 'white', marginRight: '5px' }}
                    src={CheckBox}
                    alt='icon'
                  />
                  {item.feature1}
                </CardFeatures>
                <CardFeatures>
                  <img
                    style={{ background: 'white', marginRight: '5px' }}
                    src={CheckBox}
                    alt='icon'
                  />
                  {item.feature2}
                </CardFeatures>
                <CardFeatures>
                  <img
                    style={{ background: 'white', marginRight: '5px' }}
                    src={CheckBox}
                    alt='icon'
                  />
                  {item.feature3}
                </CardFeatures>
                <CardFeatures>
                  <img
                    style={{ background: 'white', marginRight: '5px' }}
                    src={CheckBox}
                    alt='icon'
                  />
                  {item.feature4}
                </CardFeatures>
                <CardFeatures>
                  <img
                    style={{ background: 'white', marginRight: '5px' }}
                    src={item.feature5 && CheckBox}
                    alt={item.feature5 ?? 'checkbox'}
                  />
                  {item.feature5}
                </CardFeatures>
                {item.feature6 ? (
                  <CardFeatures>
                    <img
                      style={{ background: 'white', marginRight: '5px' }}
                      src={item.feature6 && CheckBox}
                      alt={item.feature6 ?? 'checkbox'}
                    />
                    {item.feature6}
                  </CardFeatures>
                ) : null}
              </Card>
            </div>
          ))}
        </Flex2>
      </FlexContainer>
    </>
  )
}

export default Subscription
