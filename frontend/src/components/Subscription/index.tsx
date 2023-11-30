import React from 'react'
import { ButtonsContainer, CancelSubscription, Container, NoButton, YesButton } from './style'

interface Props {
  handleSubscription: () => void
}

const Subscription = ({ handleSubscription }: Props): JSX.Element => {
  return (
    <Container>
        <CancelSubscription>Would you like to cancel your subscription?</CancelSubscription>
        <ButtonsContainer>
            <YesButton onClick={handleSubscription}>Yes</YesButton>
            <NoButton onClick={handleSubscription}>No</NoButton>
        </ButtonsContainer>
    </Container>
  )
}

export default Subscription
