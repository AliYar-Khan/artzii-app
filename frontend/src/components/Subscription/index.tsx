import React from 'react'
import { ButtonsContainer, CancelSubscription, Container, NoButton, YesButton } from './style';

type Props = {
    handleSubscription: () => void;
};

const Subscription = ({handleSubscription}:Props) => {
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

export default Subscription;