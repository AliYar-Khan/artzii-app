import React from "react";
import {
  CardContainer,
  CloneIcon,
  Container,
  Heading,
  MainHeading,
  MessageContainer,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storyData } from "../../services/Storydata";
import TextArea from "antd/es/input/TextArea";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import '../../utils/style.css';

type Props = {
  handleNavigation: () => void;
}

const Stories = ({handleNavigation}:Props) => {
  return (
    <>
    <Container>
      <MainHeading>Example Prompts</MainHeading>
      {storyData.map((item) => (
        <CardContainer>
          <Heading>{item.content}</Heading>
          <CloneIcon onClick={handleNavigation}>
            <FontAwesomeIcon icon={item.icon} style={{ width: "17px", background:"white" }} />
          </CloneIcon>
        </CardContainer>
      ))}
    </Container>
    <MessageContainer>
    <TextArea
        placeholder=""
        autoSize={{ minRows: 2, maxRows: 6 }}
        className="Textarea"
      />
      <FontAwesomeIcon icon={solid("paper-plane")} style={{ width: "17px", marginLeft:"-30px" }} />
      </MessageContainer>
    </>
  );
};

export default Stories;
