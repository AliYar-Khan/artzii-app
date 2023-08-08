import { useState } from "react";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import { Form, Input } from "antd";
import "../../utils/style.css";
import {
  Container,
  GoogleSigninBtn,
  Grids,
  SignupButton,
  SignUpPara,
} from "./style";
import GoogleIcon from "../../assets/google.png";
import Header from "../Header";
import Theme from "../../constants/theme";
import { useNavigate } from "react-router-dom";
import { client } from "../../apiClient/apiClient";

const Signup = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    // const data = JSON.stringify({
    //   email: values.username,
    //   password: values.password,
    // });
    // client
    //   .post("/api/users/", data, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((response) => {});
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
                Sign up with Google
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
                    style={{ color: `${Theme.GREY_COLOR}` }}
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

          <Form.Item>
            <Grids>
              <SignupButton>Sign up</SignupButton>
              <SignUpPara>
                Already have an account?{" "}
                <a href="/" className="signupButton">
                  Log-in here
                </a>
              </SignUpPara>
            </Grids>
          </Form.Item>
        </Form>
      </Container>
    </>
  );
};

export default Signup;
