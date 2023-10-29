import styled from "styled-components";
import Theme from "../../constants/theme";

export const Container = styled.div`
  margin-left: -60px;
  margin-right: auto;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 80vh;
  position: fixed;
  overflow-x: hidden;
  padding-top: 50px;
  padding-bottom: 10px;
  padding-left: 0px;
  margin-top: 30px;
  background-color: ${Theme.WHITE_COLOR};
`;

export const MainHeading = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  color: ${Theme.BLACK_COLOR};
`;

export const SubHeading = styled.h1`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  color: ${Theme.BLACK_COLOR};
`;

export const CreditButton = styled.button`
  width: 150px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: #ffffff;
  box-shadow: 0px 4px 4px #bdf4ff;
  border-radius: 4px;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  color: ${Theme.BLACK_COLOR};
  margin-right: 50px;
  cursor: pointer;
`;

export const CreditNumber = styled.div`
  font-size: 16;
  font-weight: bold;
  margin-bottom: 0px;
`;

export const CreditText = styled.div`
  font-size: 10;
  font-weight: bold;
  margin-bottom: 0px;
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 30px;
`;

export const Button = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: #ffffff;
  box-shadow: 0px 4px 4px #bdf4ff;
  border-radius: 4px;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  color: ${Theme.BLACK_COLOR};
  margin-right: 10px;
  cursor: pointer;
`;

export const BuyNowButton = styled.button`
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: #ffffff;
  box-shadow: 0px 4px 4px #bdf4ff;
  border-radius: 4px;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  color: ${Theme.BLACK_COLOR};
  margin-right: 50px;
  cursor: pointer;
`;
