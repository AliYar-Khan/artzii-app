import styled from "styled-components";
import Theme from "../../constants/theme";

export const Container = styled.div`
  width: 86vw;
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CardContainer = styled.div`
  width: 478px;
  height: 148px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 20px;
`;

export const MainHeading = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;

export const Heading = styled.h3`
  font-size: 17px;
  background: white;
  text-align: left;
  font-weight: 300;
`;
export const CloneIcon = styled.div`
  margin-top: -70px;
  margin-left: auto;
  cursor: pointer;
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
  bottom: 0;
  margin-left: -56px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-left: 200px;
  padding-right: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  left: 0px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoaderDiv = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: purple purple purple purple;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: purple;
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StoryContainer = styled.div`
  margin-left: -100px;
  margin-right: auto;
  margin-top: 40px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 350px;
  position: fixed;
  overflow-x: hidden;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 0px;
  background: white;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
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
  background: ${Theme.WHITE_COLOR} !important;
`;

export const Flex1 = styled.div`
  width: auto;
  background: ${Theme.WHITE_COLOR} !important;
`;

export const Para = styled.p`
  font-size: 14px;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
`;
