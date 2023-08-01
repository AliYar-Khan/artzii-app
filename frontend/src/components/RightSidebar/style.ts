import styled from "styled-components";
import Theme from "../../constants/theme";

export const Sidebar = styled.div`
  position: fixed;
  height: 100vh;
  width: 110px;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  right: 0px;
  top: 90px;
  padding-top: 50px;
  z-index: 100;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
export const UploadButton = styled.button`
  width: 90px;
  height: 50px;
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
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
`;

export const CoverButton = styled.button`
  width: 90px;
  height: 50px;
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
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  cursor: pointer;
`;

export const PageTitle = styled.h5`
  text-align: left;
  margin-left: 10px;
  margin-top: 40px;
  font-size: 14px;
`;
export const AddPageButton = styled.div`
  background: #ffffff;
  border: 1px solid #121212;
  width: 80px;
  height: 80px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

export const AddPageButton2 = styled.div`
  background: #ffffff;
  border: 1px solid #121212;
  width: 80px;
  height: 80px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;

export const WaterMarkRemover = styled.div`
    width: 116px;
    height: 20px;
    margin-right: 200px;
    background: #E8E8E8;
    position: absolute;
    left: -116px;
    bottom: 95px;
`