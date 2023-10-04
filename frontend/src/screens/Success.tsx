import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useStores } from "src/store/rootStore";
import { Container, SuccessMessage } from "./style";
import { client } from "src/apiClient/apiClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Success = () => {
  const initialized = useRef(false);
  const store = useStores();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      client
        .post(
          "/payment-stripe/payment-success",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": store.authStore.authToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200 && response.data.success) {
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 2000);
          } else {
            toast.error("Something went wrong", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }, []);

  if (store.authStore.initialize && !store.authStore.authToken) {
    return <Navigate to="/" replace />;
  }
  return (
    <Container>
      <SuccessMessage>Payment Successful</SuccessMessage>
    </Container>
  );
};

export default Success;
