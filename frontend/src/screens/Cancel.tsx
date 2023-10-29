import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStores } from "src/store/rootStore";
import { Container, FailedMessage } from "./style";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cancel = () => {
  const store = useStores();
  useEffect(() => {
    if (store.authStore.initialize && store.authStore.authToken) {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  }, []);

  if (store.authStore.initialize && !store.authStore.authToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <FailedMessage>Payment Cancelled</FailedMessage>
    </Container>
  );
};

export default Cancel;
