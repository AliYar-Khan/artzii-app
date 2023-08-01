import styled from "styled-components";
import Theme from "../../constants/theme";

export const Container = styled.div`
  margin-left: 0px;
  margin-right: auto;
  margin-top: 40px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: auto;
  position: fixed;
  overflow-x: hidden;
  padding-top: 50px;
  padding-bottom:50px;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
  overflow-x: hidden;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 950px;
`;

export const Flex1 = styled.div`
  width: auto;
`;
export const Flex2 = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
`;

export const Para =  styled.p`
    font-size: 14px;
    text-align: left;
    width: 700px;
`;