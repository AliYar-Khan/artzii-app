import React, { useRef, useState } from "react";
import {
  CardContainer,
  CloneIcon,
  Container,
  Heading,
  MainHeading,
  MessageContainer,
  LoaderContainer,
  LoaderDiv,
  StoryContainer,
  FlexContainer,
  Flex1,
  DownloadButton,
  Para,
} from "./style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storyData } from "../../services/Storydata";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "../../utils/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "src/apiClient/apiClient";
import { useStores } from "src/store/rootStore";
import { Margin, usePDF } from "react-to-pdf";

type Props = {
  handleNavigation: () => void;
  setActiveTab: any;
};

const Stories = ({ handleNavigation, setActiveTab }: Props) => {
  const store = useStores();
  const topicRef = useRef<TextAreaRef | null>(null);
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState(null);
  const { toPDF, targetRef } = usePDF({
    filename: "story.pdf",
    page: { margin: Margin.MEDIUM },
  });
  const generateStory = () => {
    setLoading(true);
    console.log("====================================");
    console.log(
      "topic ===>",
      topicRef?.current?.resizableTextArea?.textArea.value
    );
    console.log("====================================");
    client
      .post(
        "/ai/generate-story",
        JSON.stringify({
          topic: topicRef?.current?.resizableTextArea?.textArea.value,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": store.authStore.authToken,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          console.log("====================================");
          console.log("response.data.story --->", response.data.story);
          console.log("====================================");
          setStory(response.data.story);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const downloadStory = () => {
    toPDF();
  };
  return (
    <>
      <Container>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {!loading && story === null ? (
          <>
            <MainHeading>Example Prompts</MainHeading>
            {storyData.map((item) => (
              <CardContainer>
                <Heading>{item.content}</Heading>
                <CloneIcon
                  onClick={() => {
                    navigator.clipboard.writeText(item.content);
                    toast.success("Copied to Clipboard", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ width: "17px", background: "white" }}
                  />
                </CloneIcon>
              </CardContainer>
            ))}
          </>
        ) : loading ? (
          <LoaderContainer>
            <LoaderDiv></LoaderDiv>
          </LoaderContainer>
        ) : (
          <StoryContainer>
            <FlexContainer>
              <DownloadButton onClick={downloadStory}></DownloadButton>
              <Para ref={targetRef}>{story}</Para>
            </FlexContainer>
          </StoryContainer>
        )}
      </Container>
      <MessageContainer>
        <TextArea
          ref={topicRef}
          placeholder="Write the topic here"
          autoSize={{ minRows: 2, maxRows: 6 }}
          className="Textarea"
        />
        <FontAwesomeIcon
          onClick={generateStory}
          icon={solid("paper-plane")}
          style={{ width: "17px", marginLeft: "-30px" }}
        />
      </MessageContainer>
    </>
  );
};

export default Stories;
