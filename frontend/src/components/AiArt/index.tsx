import React, { useState, useRef } from 'react'
import {
  CardContainer,
  CloneIcon,
  Container,
  ExampleHeading,
  ExamplePrompts,
  FormulaHeading,
  FormulaPrompts,
  ArtContainer,
  ArtBox,
  ArtImage,
  Prompt,
  MessageContainer,
  Para,
  Heading,
  PromptsContainer,
  LoaderContainer,
  LoaderDiv
} from './style'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextArea from 'antd/es/input/TextArea'
import type { TextAreaRef } from 'antd/es/input/TextArea'
import { formulaPrompts } from '../../services/FormulaPrompts'
import { examplePrompts } from '../../services/ExamplePrompts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { client } from 'src/apiClient/apiClient'
import { useStores } from 'src/store/rootStore'
interface Props {
  handleNavigation: () => void
  setActiveTab: any
}

const AiArt = ({ handleNavigation, setActiveTab }: Props): JSX.Element => {
  const store = useStores()

  // [
  //   "https://cdn2.stablediffusionapi.com/generations/e653857a-11cb-4a60-927b-5eefd2fd29a0-0.png",
  //   "https://cdn2.stablediffusionapi.com/generations/e653857a-11cb-4a60-927b-5eefd2fd29a0-1.png",
  //   "https://cdn2.stablediffusionapi.com/generations/e653857a-11cb-4a60-927b-5eefd2fd29a0-2.png",
  //   "https://cdn2.stablediffusionapi.com/generations/e653857a-11cb-4a60-927b-5eefd2fd29a0-3.png",
  // ]
  const topicRef = useRef<TextAreaRef | null>(null)
  const [loading, setLoading] = useState(false)
  const [art, setArt] = useState<any>(null)
  // const [upScaleArt, setUpScaleArt] = useState(null)

  const generateArt = (): void => {
    setLoading(true)
    client
      .post(
        '/ai/generate-art',
        JSON.stringify({
          topic: topicRef?.current?.resizableTextArea?.textArea.value
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': store.authStore.authToken
          }
        }
      )
      .then((response) => {
        setLoading(false)
        if (response.status === 200 && response.data.data.output) {
          console.log('====================================')
          console.log('response.data.story --->', response.data.data)
          console.log('====================================')
          setArt(response.data.data)
        }
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.response.data.message, {
          style: {
            background: '#FFFFFF',
            color: 'black'
          },
          progressStyle: {
            background: 'black'
          },
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
  }

  const copyTextToClipBoard = async (item: any): Promise<void> => {
    await navigator.clipboard.writeText(item)
    toast.success('Copied to Clipboard', {
      style: {
        background: '#88E7FF'
      },
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    })
  }

  return (
    <Container>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <MessageContainer>
        <TextArea
          ref={topicRef}
          placeholder='Write the prompt here'
          autoSize={{ minRows: 2, maxRows: 6 }}
          className='Textarea'
        />
        <FontAwesomeIcon
          onClick={generateArt}
          icon={solid('paper-plane')}
          style={{ width: '17px', marginLeft: '-30px', cursor: 'pointer' }}
        />
      </MessageContainer>
      {!loading && art === null ? (
        <>
          <Para>
            <span style={{ fontWeight: 'bold', display: 'contents' }}>
              Remember,
            </span>{' '}
            to describe the thing you want as specifically as you can. For
            instance if you want a red panda knight, instead of red panda knight
            you may want to write “A digital illustration of a red panda wearing
            a knight armor, with sword”. Otherwise in the worst case scenario,
            you may get a red panda behind a helmet that covers its furry face.
          </Para>
          <PromptsContainer>
            <FormulaPrompts>
              <FormulaHeading>Formula Prompts</FormulaHeading>
              {formulaPrompts.map((item, index) => (
                <CardContainer key={index}>
                  <Heading>{item.content}</Heading>
                  <CloneIcon onClick={() => copyTextToClipBoard(item.content)}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      style={{ width: '17px', background: 'white' }}
                    />
                  </CloneIcon>
                </CardContainer>
              ))}
            </FormulaPrompts>

            <ExamplePrompts>
              <ExampleHeading>Example Prompts</ExampleHeading>
              {examplePrompts.map((item, index) => (
                <CardContainer key={index}>
                  <Heading>{item.content}</Heading>
                  <CloneIcon onClick={() => copyTextToClipBoard(item.content)}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      style={{ width: '17px', background: 'white' }}
                    />
                  </CloneIcon>
                </CardContainer>
              ))}
            </ExamplePrompts>
          </PromptsContainer>
        </>
      ) : loading ? (
        <LoaderContainer>
          <LoaderDiv></LoaderDiv>
        </LoaderContainer>
      ) : (
        <ArtContainer>
          {art?.output?.map((item: string | undefined, index: number) => (
            <ArtBox key={index}>
              <Prompt>
                {topicRef?.current?.resizableTextArea?.textArea.value}
              </Prompt>
              <ArtImage key={index} src={item} alt={'art generated'} />
            </ArtBox>
          ))}
        </ArtContainer>
      )}
      {/* <ArtContainer> */}

      {/* </ArtContainer> */}
    </Container>
  )
}

export default AiArt
