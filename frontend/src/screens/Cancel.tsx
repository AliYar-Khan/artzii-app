import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useStores } from "src/store/rootStore";
import { Container, FailedMessage } from "./style";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cancel = () => {
  const initialized = useRef(false);
  const store = useStores();

  if (store.authStore.initialize && !store.authStore.authToken) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);

  return (
    <Container>
      <FailedMessage>Payment Cancelled</FailedMessage>
    </Container>
  );
};

export default Cancel;
