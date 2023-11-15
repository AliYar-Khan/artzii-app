import styled from "styled-components";

export const Container = styled.div`
  width: 85vw;
  height: 70vh;
  overflow: auto;
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
export const Para = styled.p`
  display: flex;
  font-weight: 300;
  font-size: 17px;
  line-height: 26px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`;

export const PromptsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FormulaPrompts = styled.div`
  width: 50%;
`;

export const ExamplePrompts = styled.div`
  width: 100%;
`;

export const FormulaHeading = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;

export const ExampleHeading = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;

export const CardContainer = styled.div`
  width: 478px;
  height: 108px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 20px;
`;

export const CloneIcon = styled.div`
  margin-top: -70px;
  margin-left: auto;
  cursor: pointer;
  background: white;
`;

export const Heading = styled.h3`
  font-size: 17px;
  background: white;
  text-align: left;
  font-weight: 200;
`;

export const ArtContainer = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
