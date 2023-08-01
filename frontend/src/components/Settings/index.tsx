import React from "react";
import { AccountHeading, CancelSubscription, Container, Flex1, Flex2, FlexContainer, UpdateButton } from "./style";
import { Form, Input } from "antd";
import Theme from "../../constants/theme";
import '../../utils/style.css';
import Upgrade from "../Upgrade";

const Settings = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Container>
      <AccountHeading>Account Settings</AccountHeading>
      <FlexContainer>
        <Flex1>
        <Form
         name="normal_login"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{width:"600px", background:`${Theme.WHITE_COLOR}` }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="name" className="inputField" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input placeholder="address" className="inputField" />
          </Form.Item>
          <Form.Item
            name="city"
            rules={[{ required: true, message: "Please input your city name!" }]}
          >
            <Input placeholder="city" className="inputField" />
          </Form.Item>
          <Form.Item
            name="state"
            rules={[{ required: true, message: "Please input your state!" }]}
          >
            <Input placeholder="state" className="inputField" />
          </Form.Item>

          <Form.Item>
          <Form.Item
            name="country"
            rules={[{ required: true, message: "Please input your country name!" }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input placeholder="country" className="inputField" />
          </Form.Item>
          <Form.Item
            name="zip code"
            rules={[{ required: true, message: "Please input your zip code!" }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' , margin: '0 8px' }}
          >
            <Input placeholder="zip code" className="inputField" />
          </Form.Item>
          </Form.Item>

          <Form.Item
            name="Phone Number"
            rules={[{ required: true, message: "Please input your phone number!" }]}
            style={{marginTop:"-30px"}}
          >
            <Input placeholder="phone number" className="inputField" />
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
          style={{width:"600px",  background:`${Theme.WHITE_COLOR}` }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="email" className="inputField" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="password" className="inputField" />
          </Form.Item>
          <UpdateButton>Update</UpdateButton>
          <Form.Item
            name="card"
            rules={[{ required: true, message: "Please input your name on card!" }]}
          >
            <Input placeholder="full name on card" className="inputField" />
          </Form.Item>
          <Form.Item
            name="card number"
            rules={[{ required: true, message: "Please input your card number!" }]}
          >
            <Input placeholder="card number" className="inputField" />
          </Form.Item>

          <Form.Item>
          <Form.Item
            name="expiration"
            rules={[{ required: true, message: "Please input your card's expiry date!" }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input placeholder="expiration MM/YYYY" className="inputField" />
          </Form.Item>
          <Form.Item
            name="security code"
            rules={[{ required: true, message: "Please input your security code!" }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' , margin: '0 8px' }}
          >
            <Input placeholder="security code" className="inputField" />
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
