/* eslint-disable no-labels */
import React, { useState, useEffect } from "react";
import { Container, SaveButton, InputContainer } from "./style";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import { SizeSection } from "polotno/side-panel";

import { SizePanel } from "polotno/side-panel/size-panel";
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
import ObjectIcon from "../../assets/objectsIcon.png";
import ObjectColor from "../../assets/objectColor.png";
import PhotoIcon from "../../assets/photosIcon.png";
import PhotoColor from "../../assets/photosColor.png";
import UploadIcon from "../../assets/uploadBlack.png";
import uploadColor from "../../assets/uploadColor.png";
import TextIcon from "../../assets/Textblack.png";
import TextColor from "../../assets/TextColor.png";
import TemplateIcon from "../../assets/templatesIcon.png";
import TemplateColor from "../../assets/templateColor.png";
import SizingIcon from "../../assets/sizingIcon.png";
import SizingColor from "../../assets/sizingColor.png";
import { DownloadButton } from "polotno/toolbar/download-button";
import "../../utils/style.css";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import { StoreProps, createStore } from "polotno/model/store";
import RightSideBar from "../RightSidebar";
import UploadModal from "../UploadModal";
import { Store } from "antd/es/form/interface";
import { client } from "../../apiClient/apiClient";
import { useStores } from "src/store/rootStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storePolotno = createStore({
  key: "xztVISt8d-Jmh7imOFAM",
  showCredit: true,
});
const page = storePolotno.addPage();

const Designer = (props: { setActiveTab: any }) => {
  const store = useStores();
  const designName: any = React.useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const pg = storePolotno;

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
            src={ObjectColor}
            alt="character"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={ObjectIcon}
            alt="character"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Objects</p>
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
            src={PhotoColor}
            alt="animals"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={PhotoIcon}
            alt="animals"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Photos</p>
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
          <img src={uploadColor} alt="props" style={{ background: "white" }} />
        ) : (
          <img src={UploadIcon} alt="props" style={{ background: "white" }} />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Upload</p>
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
        <p style={{ background: "white", fontSize: "12px" }}>Templates</p>
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
            src={SizingColor}
            alt="text"
            style={{ background: "white", width: "36px" }}
          />
        ) : (
          <img
            src={SizingIcon}
            alt="text"
            style={{ background: "white", width: "36px" }}
          />
        )}
        <p style={{ background: "white", fontSize: "12px" }}>Sizing</p>
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
    customSection7,
  ];

  // const customs = [
  //   customSection6,
  //   SizeSection
  // ];

  const handleUpload = () => {
    setIsModalOpen(true);
  };

  const handlePages = () => {
    pg.addPage();
  };

  const handleSave = () => {
    try {
      const jsonObject = {
        name: designName.current.value,
        ...storePolotno.toJSON(),
      };
      if (!store.designStore.designId) {
        client
          .post("/design/", JSON.stringify(jsonObject), {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": store.authStore.authToken,
            },
          })
          .then(
            async (response: {
              data: { success: boolean; designId: string };
            }) => {
              console.log("====================================");
              console.log("response.data -->>", response.data);
              console.log("====================================");
              if (response.data.success === true) {
                store.designStore.updateDesignId(response.data.designId);
                toast.success("Saved successfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              } else {
                toast.error("Something went wrong !", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            }
          );
      } else {
        client
          .put(
            `/design/${store.designStore.designId}`,
            JSON.stringify(jsonObject),
            {
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": store.authStore.authToken,
              },
            }
          )
          .then(
            async (response: {
              data: { success: boolean; designId: string };
            }) => {
              console.log("====================================");
              console.log("response.data -->>", response.data);
              console.log("====================================");
              if (response.data.success === true) {
                store.designStore.updateDesignId(response.data.designId);
                toast.success("Updated successfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              } else {
                toast.error("Something went wrong !", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            }
          )
          .catch((err) => {
            console.log("====================================");
            console.log("err updating design --->>", err);
            console.log("====================================");
            toast.error("Something went wrong !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
      }
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (store.designStore.designId !== "") {
      client
        .get(`/design/${store.designStore.designId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": store.authStore.authToken,
          },
        })
        .then(async (response) => {
          console.log("====================================");
          console.log("response of geting design --->", response);
          console.log("====================================");
          if (response.data.success === true) {
            pg.loadJSON(response.data.design);
            designName.current.value = response.data.design.name;
          } else {
            if (response.status === 401) {
              toast.error("Token Expired. Login Again!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              await store.logout();
              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            } else {
              toast.error(response.data.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
          }
        })
        .catch(async (err) => {
          if (err.response.status === 401) {
            toast.error("Token Expired. Login Again!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            await store.logout();
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } else {
            toast.error(err.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.designStore.designId]);

  const ActionControls = ({ store }: Store) => {
    return (
      <>
        <DownloadButton store={store} />
        <SaveButton onClick={handleSave}>Save</SaveButton>
        <InputContainer
          ref={designName}
          placeholder="untitled"
          type="text"
        ></InputContainer>
      </>
    );
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <PolotnoContainer
        style={{
          width: "90vw",
          height: "auto",
          overflowY: "auto",
          overflowX: "auto !important",
        }}
      >
        <SidePanelWrap>
          <SidePanel store={pg} sections={Sections} defaultSection="custom1" />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar
            store={pg}
            downloadButtonEnabled
            components={{ ActionControls }}
          />
          <Workspace store={pg} />
          <ZoomButtons store={pg} />
        </WorkspaceWrap>
      </PolotnoContainer>
      <UploadModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <RightSideBar
        store={pg}
        handleUpload={handleUpload}
        handlePages={handlePages}
        handleCover={handleCover}
      />
    </Container>
  );
};

export default Designer;
