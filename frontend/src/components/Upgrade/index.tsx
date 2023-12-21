import React from 'react'
import {
  AccessButton,
  // AnnualHeading,
  // Billed,
  ManageSubscription,
  // CancelSubscription,
  CardDescription,
  CardFeatures,
  CardHeading,
  Container,
  CurrentPlanHeading,
  // Flex1,
  Flex2,
  FlexContainer,
  MainHeading,
  // MonthlyHeading,
  PricingImage,
  AnnualPrice
} from './style'
import '../../utils/style.css'
import { Badge, Card } from 'antd'
// import Discount from '../../assets/discount.png'
import CheckBox from '../../assets/Checkbox.png'
import ArrowDown from '../../assets/Group.png'
import { pricingData } from '../../services/PricingData'
// import Subscription from '../Subscription'
import { client } from '../../apiClient/apiClient'
import { useStores } from 'src/store/rootStore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Upgrade = (): JSX.Element => {
  const store = useStores()
  // const [annualChecked, setAnnualChecked] = useState(true) // state for changing billing mode
  // const [subscription, setSubscription] = useState(false)

  // const onChange = (): void => {
  //   setAnnualChecked(!annualChecked)
  // }

  // const handleSubscription = (): void => {
  //   setSubscription(!subscription)
  // }

  const manageSubscription = (): void => {
    window.open(
      'https://billing.stripe.com/p/login/test_fZe9CacoegjIdheeUU',
      '_blank'
    )
  }

  const checkout = (price: string): void => {
    const data = JSON.stringify({
      planPrice: price
    })

    client
      .post('/payment-stripe/subscribe-session', data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': store.authStore.authToken
        }
      })
      .then((response) => {
        if (response.status === 200) {
          window.location = response.data.url
        }
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          toast.error('Token Expired. Login Again!', {
            style: {
              background: '#FFFFFF',
              color: 'black'
            },
            progressStyle: {
              background: 'black'
            },
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          await store.logout()
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        } else {
          toast.error(err.response.data.message, {
            style: {
              background: '#FFFFFF',
              color: 'black'
            },
            progressStyle: {
              background: 'black'
            },
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
        }
      })
  }

  return (
    <Container>
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
          width: '60px'
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
              {store.authStore.user.subscription ===
              item.title.toLowerCase() ? (
                <div
                  style={{
                    marginTop: '-40px'
                  }}
                >
                  <CurrentPlanHeading>You are here</CurrentPlanHeading>
                  <img
                    src={ArrowDown}
                    style={{
                      width: '30px',
                      display: 'flex',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: '-10px'
                    }}
                    alt='arrow'
                  />
                </div>
              ) : null}
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
                      if (
                        store.authStore.user.subscription === 'lite' ||
                        store.authStore.user.subscription === 'pro' ||
                        store.authStore.user.subscription === 'enterprise'
                      ) {
                        toast.success(
                          'Manage subscription from Top Left Button',
                          {
                            style: {
                              background: '#88E7FF'
                            },
                            position: 'top-right',
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'colored'
                          }
                        )
                      } else {
                        checkout(item.monthlyPriceValue)
                      }
                    }
                  }}
                >
                  Access Now
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
      {/* <CancelSubscription onClick={handleSubscription}>
            Cancel Subscription?
          </CancelSubscription> */}
      <ManageSubscription onClick={manageSubscription}>
        Manage Subscriptions
      </ManageSubscription>
    </Container>
  )
}

export default Upgrade
