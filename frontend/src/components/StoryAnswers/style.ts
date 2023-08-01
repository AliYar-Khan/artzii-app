import styled from "styled-components";
import Theme from "../../constants/theme";

export const Container = styled.div`
  margin-left: -100px;
  margin-right: auto;
  margin-top: 40px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 350px;
  position: fixed;
  overflow-x: hidden;
  padding-top: 20px;
  padding-bottom:20px;
  padding-left: 0px;
  background: white;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
`;

export const Heading = styled.h1`
    font-size: 17px;
    width: 700px;
    margin-left: 300px;
    margin-top: 30px;
`
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
  overflow-x: hidden;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 950px;
  background: ${Theme.WHITE_COLOR} !important;
`;

export const Flex1 = styled.div`
  width: auto;
  background: ${Theme.WHITE_COLOR} !important;
`;
export const Flex2 = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  background: ${Theme.WHITE_COLOR} !important;
`;

export const Para = styled.p`
    font-size: 14px;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
`;

export const MessageContainer = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100px;
  z-index: -100;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom:0;
  margin-left: -56px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-left: 200px;
  padding-right: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  left:0px;
`;