import React from 'react'
import {
  Container,
  Flex1,
  Flex2,
  FlexContainer,
  MessageContainer,
  Para,
  Image
} from './style'
import Art from '../../assets/Art.png'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextArea from 'antd/es/input/TextArea'

interface Props {
  handleArtPainting: () => void
}

const ArtPrompt = ({ handleArtPainting }: Props): JSX.Element => {
  return (
    <>
      <Container>
        <FlexContainer>
          <Flex1>
            <Para>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames
              ac turpis egestas sed...
            </Para>
            <Image src={Art}/>
          </Flex1>
          <Flex2>
            <FontAwesomeIcon
              icon={solid('clone')}
              style={{
                width: '17px',
                backgroundColor: 'white',
                marginBottom: '20px',
                marginTop: '20px',
                marginLeft: '50px',
                cursor: 'pointer'
              }}
              onClick={handleArtPainting}
            />
            <FontAwesomeIcon
              icon={solid('clone')}
              style={{
                width: '17px',
                backgroundColor: 'white',
                marginBottom: '20px',
                marginTop: '20px',
                marginLeft: '50px',
                cursor: 'pointer'
              }}
              onClick={handleArtPainting}
            />
            <FontAwesomeIcon
              icon={solid('pen-to-square')}
              style={{
                width: '17px',
                backgroundColor: 'white',
                marginTop: '20px',
                marginLeft: '50px',
                cursor: 'pointer'
              }}
              onClick={handleArtPainting}
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
          icon={solid('paper-plane')}
          style={{ width: '17px', marginLeft: '-30px' }}
        />
      </MessageContainer>
    </>
  )
}

export default ArtPrompt
