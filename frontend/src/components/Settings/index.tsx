import React from "react";
import {
  AccountHeading,
  CancelSubscription,
  Container,
  Flex1,
  Flex2,
  FlexContainer,
  UpdateButton,
} from "./style";
import { Form, Input } from "antd";
import Theme from "../../constants/theme";
import "../../utils/style.css";
import Upgrade from "../Upgrade";
import { useStores } from "src/store/rootStore";

const Settings = () => {
  const store = useStores();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  console.log("====================================");
  console.log("store.authStore.user --->>", store.authStore.user);
  console.log("====================================");
  return (
    <Container>
      <AccountHeading>Account Settings</AccountHeading>
      <FlexContainer>
        <Flex1>
          <Form
            name="normal_login"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            initialValues={{
              username: store.authStore.user.name,
              phoneNumber: store.authStore.user.phoneNumber,
              address: store.authStore.user.address,
              city: store.authStore.user.city,
              state: store.authStore.user.state,
              country: store.authStore.user.country,
              zipCode: store.authStore.user.zipCode,
            }}
            wrapperCol={{ span: 16 }}
            style={{ width: "600px", background: `${Theme.WHITE_COLOR}` }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                name="username"
                placeholder="name"
                className="inputField"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                name="address"
                placeholder="address"
                className="inputField"
                value={store.authStore.user?.address}
              />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[
                { required: true, message: "Please input your city name!" },
              ]}
            >
              <Input
                name="city"
                placeholder="city"
                className="inputField"
                value={store.authStore.user?.city}
              />
            </Form.Item>
            <Form.Item
              name="state"
              rules={[{ required: true, message: "Please input your state!" }]}
            >
              <Input
                name="state"
                placeholder="state"
                className="inputField"
                value={store.authStore.user?.state}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please input your country name!",
                  },
                ]}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                <Input
                  name="country"
                  placeholder="country"
                  className="inputField"
                  value={store.authStore.user?.country}
                />
              </Form.Item>
              <Form.Item
                name="zipCode"
                rules={[
                  { required: true, message: "Please input your zip code!" },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input
                  name="zipCode"
                  placeholder="zip code"
                  className="inputField"
                  value={store.authStore.user?.zipCode}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
              style={{ marginTop: "-30px" }}
            >
              <Input
                name="phoneNumber"
                placeholder="phone number"
                className="inputField"
                value={store.authStore.user?.phoneNumber}
              />
            </Form.Item>

            <UpdateButton>Update</UpdateButton>
          </Form>
        </Flex1>
        <Flex2>
          <Form
            name="normal_login"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              email: store.authStore.user.email,
              password: "",
              card: "",
              cardNumber: "",
              expiration: "",
              securityCode: "",
            }}
            style={{ width: "600px", background: `${Theme.WHITE_COLOR}` }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                name="email"
                placeholder="email"
                style={{ color: "black" }}
                className="inputField"
                value={
                  store.authStore.user?.email ? store.authStore.user.email : ""
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                name="password"
                placeholder="password"
                className="inputField"
              />
            </Form.Item>
            <UpdateButton>Update</UpdateButton>
            <Form.Item
              name="card"
              rules={[
                { required: true, message: "Please input your name on card!" },
              ]}
            >
              <Input
                name="card"
                placeholder="full name on card"
                className="inputField"
              />
            </Form.Item>
            <Form.Item
              name="cardNumber"
              rules={[
                { required: true, message: "Please input your card number!" },
              ]}
            >
              <Input
                name="cardNumber"
                placeholder="card number"
                className="inputField"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item
                name="expiration"
                rules={[
                  {
                    required: true,
                    message: "Please input your card's expiry date!",
                  },
                ]}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                <Input
                  name="expiration"
                  placeholder="expiration MM/YYYY"
                  className="inputField"
                />
              </Form.Item>
              <Form.Item
                name="securityCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your security code!",
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input
                  name="securityCode"
                  placeholder="security code"
                  className="inputField"
                />
              </Form.Item>
            </Form.Item>

            <UpdateButton>Update</UpdateButton>
          </Form>
        </Flex2>
      </FlexContainer>
      <CancelSubscription>Cancel Subscription?</CancelSubscription>
    </Container>
  );
};

export default Settings;
