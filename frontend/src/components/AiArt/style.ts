import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Container = styled.div`
  width: 86vw;
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const MessageContainer = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100px;
  z-index: -100;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0;
  margin-left: -56px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-left: 200px;
  padding-right: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  left: 0px;
`
export const Para = styled.p`
  display: flex;
  font-weight: 300;
  font-size: 17px;
  line-height: 26px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`

export const PromptsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const FormulaPrompts = styled.div`
  width: 50%;
`

export const ExamplePrompts = styled.div`
  width: 50%;
`

export const FormulaHeading = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`

export const ExampleHeading = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`

export const CardContainer = styled.div`
  width: 478px;
  height: 108px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 20px;
`

export const CloneIcon = styled.div`
  margin-top: -70px;
  margin-left: auto;
  cursor: pointer;
  background: white;
`

export const Heading = styled.h3`
  font-size: 17px;
  background: white;
  text-align: left;
  font-weight: 200;
`

export const ArtContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
  overflow-x: hidden;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 950px;
  background: ${Theme.WHITE_COLOR} !important;
`

export const ArtBox = styled.div`
  width: auto;
  background: ${Theme.WHITE_COLOR} !important;
`

export const Prompt = styled.p`
  font-size: 17px;
  text-align: center;
  background-color: ${Theme.WHITE_COLOR};
  width: 700px;
`

export const ArtImage = styled.img`
  width: 500px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  height: 500px;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoaderDiv = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`
