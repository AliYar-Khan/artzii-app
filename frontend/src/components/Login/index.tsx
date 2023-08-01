import React, { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import "../../utils/style.css";
import {
  Container,
  GoogleSigninBtn,
  Grids,
  LoginButton,
  SignUpPara,
} from "./style";
import GoogleIcon from "../../assets/google.png";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Theme from "../../constants/theme";

const Login = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/dashboard");
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <Header
        handleSettingsClick={handleNavigation}
        handleUpgradeClick={handleNavigation}
      />
      <Container>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ backgroundColor: "white" }}
        >
          <Form.Item>
            <Grids>
              <GoogleSigninBtn>
                <img
                  src={GoogleIcon}
                  alt="google icon"
                  style={{ marginRight: "10px" }}
                />
                Sign in with Google
              </GoogleSigninBtn>
            </Grids>
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="email" className="inputField" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="inputField"
              suffix={
                showPassword ? (
                  <EyeInvisibleFilled
                    style={{ color: `${Theme.GREY_COLOR}`, background: `${Theme.WHITE_COLOR} !important` }}
                    onClick={handleClickShowPassword}
                  />
                ) : (
                  <EyeFilled
                    style={{ color: `${Theme.GREY_COLOR}` }}
                    onClick={handleClickShowPassword}
                  />
                )
              }
            />
          </Form.Item>
          <Form.Item style={{ marginTop: "-10px", marginBottom: "30px" }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="checkbox">Remember me</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              href="#/"
              style={{
                position: "absolute",
                right: 0,
                color: "rgb(183 108 145)",
              }}
            >
              Forgot your password?
            </a>
          </Form.Item>

          <Form.Item>
            <Grids>
              <LoginButton onClick={handleNavigation}>Login</LoginButton>
              <SignUpPara>
                Need an account?{" "}
                <a href="/signup" className="signupButton">
                  sign-up here
                </a>
              </SignUpPara>
            </Grids>
          </Form.Item>
        </Form>
      </Container>
    </>
  );
};

export default Login;
