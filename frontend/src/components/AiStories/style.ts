import styled from "styled-components";

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
