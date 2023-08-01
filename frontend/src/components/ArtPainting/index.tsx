import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import Art from '../../assets/Art.png';
import { Container, FlexContainer, Flex1, Flex2, MessageContainer, Image, Eraser } from './style';

const ArtPainting = () => {
    return (
        <>
          <Container>
            <FlexContainer>
              <Flex1>
                <Eraser></Eraser>
                <Image src={Art}/>
              </Flex1>
              <Flex2>
                <FontAwesomeIcon
                  icon={solid("clone")}
                  style={{
                    width: "17px",
                    backgroundColor: "white",
                    marginTop: "50px",
                    marginLeft: "50px",
                    cursor: "pointer",
                  }}
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

export default ArtPainting;