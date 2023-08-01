import React from "react";
import {
  AddPageButton,
  AddPageButton2,
  CoverButton,
  PageTitle,
  Sidebar,
  UploadButton,
  WaterMarkRemover,
} from "./style";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  handleUpload: any;
  handlePages: () => void;
  handleCover: () => void;
}

const RightSideBar = ({handleUpload, handlePages, handleCover}:Props) => {
  return (
    <Sidebar>
      <CoverButton onClick={handleCover}>Cover</CoverButton>
      <UploadButton onClick={handleUpload}>Upload</UploadButton>
      <PageTitle>Pages</PageTitle>
      <AddPageButton onClick={handlePages}></AddPageButton>
      <AddPageButton2 onClick={handlePages}>
        <FontAwesomeIcon
          icon={solid("add")}
          style={{ width: "17px", backgroundColor: "white" }}
        />
      </AddPageButton2>
      <WaterMarkRemover></WaterMarkRemover>
    </Sidebar>
  );
};

export default RightSideBar;
