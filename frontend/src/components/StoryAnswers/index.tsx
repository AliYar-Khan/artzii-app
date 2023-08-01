import React from "react";
import {
  Container,
  Flex1,
  Flex2,
  FlexContainer,
  Heading,
  MessageContainer,
  Para,
} from "./style";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "antd/es/input/TextArea";

type Props = {
  handleEditorNavigation: () => void;
}

const StoryAnswers = ({handleEditorNavigation}:Props) => {
  return (
    <>
      <Heading>Provide a creative protagonist for a children's story.</Heading>
      <Container>
        <FlexContainer>
          <Flex1>
            <Para>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames
              ac turpis egestas sed tempus urna et pharetra. Amet consectetur
              adipiscing elit duis tristique sollicitudin. Ante metus dictum at
              tempor commodo ullamcorper. Tincidunt vitae semper quis lectus
              nulla. Sem et tortor consequat id porta nibh venenatis cras sed.
              Eget arcu dictum varius duis. Rhoncus urna neque viverra justo.
              Interdum velit laoreet id donec. At volutpat diam ut venenatis
              tellus in metus vulputate eu.
            </Para>

            <Para>
              Orci dapibus ultrices in iaculis nunc sed augue. A lacus
              vestibulum sed arcu non odio. Elementum pulvinar etiam non quam
              lacus suspendisse faucibus interdum posuere. Aliquam nulla
              facilisi cras fermentum odio eu. Congue nisi vitae suscipit tellus
              mauris a diam maecenas sed. Morbi tristique senectus et netus. At
              augue eget arcu dictum varius duis. Arcu bibendum at varius vel.
              Potenti nullam ac tortor vitae purus faucibus ornare suspendisse.
              Imperdiet sed euismod nisi porta lorem mollis aliquam. Augue neque
              gravida in fermentum et sollicitudin ac. Quis auctor elit sed
              vulputate mi sit amet mauris commodo. Eu turpis egestas pretium
              aenean pharetra magna. Fringilla urna porttitor rhoncus dolor
              purus non enim praesent. Sed adipiscing diam donec adipiscing
              tristique. Mauris in aliquam sem fringilla ut morbi tincidunt
              augue.
            </Para>
          </Flex1>
          <Flex2>
            <FontAwesomeIcon
              icon={solid("clone")}
              style={{
                width: "17px",
                backgroundColor: "white",
                marginBottom: "20px",
                marginTop: "20px",
                marginLeft: "50px",
                cursor: "pointer"
              }}
            />
            <FontAwesomeIcon
              icon={solid("pen-to-square")}
              style={{
                width: "17px",
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "50px", 
                cursor: "pointer"
              }}
              onClick={handleEditorNavigation}
            />
          </Flex2>
        </FlexContainer>
      </Container>
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
    </>
  );
};

export default StoryAnswers;
