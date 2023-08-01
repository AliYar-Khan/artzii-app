/* eslint-disable no-labels */
import React, { useState } from "react";
import { Container, SaveButton } from "./style";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import { SizeSection } from "polotno/side-panel";
import {SizePanel} from 'polotno/side-panel/size-panel'
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { BackgroundPanel } from "polotno/side-panel/background-panel";
import { PhotosPanel } from "polotno/side-panel/photos-panel";
import { UploadPanel } from "polotno/side-panel/upload-panel";
import { TextPanel } from "polotno/side-panel/text-panel";
import { ElementsPanel } from "polotno/side-panel/elements-panel";
import { TemplatesPanel } from "polotno/side-panel/templates-panel";
import { Workspace } from "polotno/canvas/workspace";
import BgIcon from "../../assets/bgicon.png";
import bgColor from "../../assets/bgiconcolor.png";
import CharacterIcon from "../../assets/Characterblack.png";
import CharacterColor from "../../assets/characterColor.png";
import AnimalIcon from "../../assets/Animalblack.png";
import AnimalColor from "../../assets/AnimalColor.png";
import PropsIcon from "../../assets/Propsblack.png";
import PropsColor from "../../assets/PropsColor.png";
import TextIcon from "../../assets/Textblack.png";
import TextColor from "../../assets/TextColor.png";
import TemplateIcon from "../../assets/templateicon.png";
import TemplateColor from "../../assets/templateColor.png";
import PagesColor from '../../assets/pagescolor.png';
import PagesIcon from '../../assets/pagesicon.png';
import { DownloadButton } from "polotno/toolbar/download-button";
import "../../utils/style.css";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import { StoreProps, createStore } from "polotno/model/store";
import RightSideBar from "../RightSidebar";
import UploadModal from "../UploadModal";
import { Store } from "antd/es/form/interface";

const store = createStore({
  key: "xztVISt8d-Jmh7imOFAM",
  showCredit: true,
});
const page = store.addPage();

const Designer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const pg = store;

  const customSection: any = {
    name: "custom1",
    Tab: (props: any) => (
      <SectionTab {...props}>
        {props.active ? (
          <img
            src={bgColor}
            alt="background"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={BgIcon}
            alt="background"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Backgrounds</p>
      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: observer((store: any) => {
      return (
        <div>
          <BackgroundPanel store={pg} />
        </div>
      );
    }),
  };

  const customSection2: any = {
    name: "custom2",
    Tab: (props: any) => (
      <SectionTab {...props}>
        {props.active ? (
          <img
            src={CharacterColor}
            alt="character"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={CharacterIcon}
            alt="character"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Characters</p>
      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: observer((store: any) => {
      return (
        <div>
          <ElementsPanel store={pg} />
        </div>
      );
    }),
  };

  const customSection3: any = {
    name: "custom3",
    Tab: (props: any) => (
      <SectionTab {...props}>
        {props.active ? (
          <img
            src={AnimalColor}
            alt="animals"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={AnimalIcon}
            alt="animals"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Animals</p>
      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: observer((store: any) => {
      return (
        <div>
          <PhotosPanel store={pg} />
        </div>
      );
    }),
  };

  const customSection4: any = {
    name: "custom4",
    Tab: (props: any) => (
      <SectionTab {...props}>
        {props.active ? (
          <img src={PropsColor} alt="props" style={{ background: "white" }} />
        ) : (
          <img src={PropsIcon} alt="props" style={{ background: "white" }} />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Props</p>
      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: observer((store: any) => {
      return (
        <div>
          <UploadPanel store={pg} />
        </div>
      );
    }),
  };

  const customSection5: any = {
    name: "custom5",
    Tab: (props: any) => (
      <SectionTab {...props}>
        {props.active ? (
          <img
            src={TextColor}
            alt="text"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={TextIcon}
            alt="text"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Text</p>
      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: observer((store: any) => {
      return (
        <div>
          <TextPanel store={pg} />
        </div>
      );
    }),
  };

  const customSection6: any = {
    name: "custom6",
    Tab: (props: any) => (
      <SectionTab {...props}>
        {props.active ? (
          <img
            src={TemplateColor}
            alt="text"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={TemplateIcon}
            alt="text"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Cover</p>
      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: observer((store: any) => {
      return (
        <div>
          <TemplatesPanel store={pg} />
        </div>
      );
    }),
  };

  const customSection7: any = {
    name: "custom7",
    Tab: (props: any) => (
      <SectionTab {...props}>
        {props.active ? (
          <img
            src={PagesColor}
            alt="text"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={PagesIcon}
            alt="text"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Pages</p>
      </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: observer((store: any) => {
      return (
        <div>
          <SizePanel store={pg} />
        </div>
      );
    }),
  };

  const handleCover = () => {
    setShowTemplates(!showTemplates);
  };

  const Sections = [
    customSection,
    customSection2,
    customSection3,
    customSection4,
    customSection5,
    customSection6,
    customSection7
  ];

  // const customs = [
  //   customSection6,
  //   SizeSection
  // ];

  const handleUpload = () => {
    setIsModalOpen(true);
  };

  const ActionControls = ({ store }: Store) => {
    return (
      <>
        <DownloadButton store={store} />
        <SaveButton>Save</SaveButton>
      </>
    );
  };

  return (
    <Container>
      <PolotnoContainer
        style={{
          width: "90vw",
          height: "auto",
          overflowY: "auto",
          overflowX: "auto !important",
        }}
      >
        <SidePanelWrap>
          <SidePanel
            store={store}
            sections={Sections}
            defaultSection="custom1"
          />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar
            store={store}
            downloadButtonEnabled
            components={{ ActionControls }}
          />
          <Workspace store={store} />
          <ZoomButtons store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
      <UploadModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <RightSideBar
        handleUpload={handleUpload}
        handlePages={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleCover={handleCover}
      />
    </Container>
  );
};

export default Designer;
