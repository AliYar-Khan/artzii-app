import React from "react";
import {
  CardContainer,
  CloneIcon,
  Container,
  ExampleHeading,
  ExamplePrompts,
  FormulaHeading,
  FormulaPrompts,
  MessageContainer,
  Para,
  PromptsContainer,
} from "./style";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "antd/es/input/TextArea";
import { formulaPrompts } from "../../services/FormulaPrompts";
import { Heading } from "./style";
import { examplePrompts } from "../../services/ExamplePrompts";

type Props = {
  handleNavigation: () => void;
  setActiveTab: any;
};

const AiArt = ({ handleNavigation, setActiveTab }: Props) => {
  return (
    <Container>
      <MessageContainer>
        <TextArea
          placeholder=""
          autoSize={{ minRows: 2, maxRows: 6 }}
          className="Textarea"
        />
        <FontAwesomeIcon
          icon={solid("paper-plane")}
          style={{ width: "17px", marginLeft: "-30px" }}
        />
      </MessageContainer>
      <Para>
        <span style={{ fontWeight: "bold", display: "contents" }}>
          Remember,
        </span>{" "}
        to describe the thing you want as specifically as you can. For instance
        if you want a red panda knight, instead of red panda knight you may want
        to write “A digital illustration of a red panda wearing a knight armor,
        with sword”. Otherwise in the worst case scenario, you may get a red
        panda behind a helmet that covers its furry face.
      </Para>
      <PromptsContainer>
        <FormulaPrompts>
          <FormulaHeading>Formula Prompts</FormulaHeading>
          {formulaPrompts.map((item) => (
            <CardContainer>
              <Heading>{item.content}</Heading>
              <CloneIcon onClick={handleNavigation}>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ width: "17px", background: "white" }}
                />
              </CloneIcon>
            </CardContainer>
          ))}
        </FormulaPrompts>

        <ExamplePrompts>
          <ExampleHeading>Example Prompts</ExampleHeading>
          {examplePrompts.map((item) => (
            <CardContainer>
              <Heading>{item.content}</Heading>
              <CloneIcon onClick={handleNavigation}>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ width: "17px", background: "white" }}
                />
              </CloneIcon>
            </CardContainer>
          ))}
        </ExamplePrompts>
      </PromptsContainer>
    </Container>
  );
};

export default AiArt;
