import styled from "styled-components";
import Theme from "../../constants/theme";

export const Container = styled.div`
  width: 530px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 60px;
  padding-bottom: 10px;
  background-color: white;
`;

export const SignUpPara = styled.p`
  text-align: center;
  margin-top: 15px;
  background-color: white;
`;

export const Grids = styled.div`
  display: grid;
  background-color: white;
`;
export const LoginButton = styled.button`
  cursor: pointer;
  height: 50px;
  background: ${Theme.WHITE_COLOR};
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  color: ${Theme.BLACK_COLOR};
`;

export const GoogleSigninBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 50px;
  background: ${Theme.WHITE_COLOR};
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: ${Theme.BLACK_COLOR};
  border: 1px solid ${Theme.LIGHT_GREY_COLOR};
`;