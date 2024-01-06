import styled from 'styled-components'
import Theme from '../../constants/theme'

export const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -40px;
  margin-top: -5px;
  z-index: 0;
`

export const Container = styled.div`
  position: fixed;
  display: flex;
  margin-top: 50px;
  margin-left: 270px;
  height: 100vh;
  width: -webkit-fill-available;
  width: -moz-available;
  top: 40px;
  bottom: 20px;
  background: white;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  z-index: -10;
`
export const LeftContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 290px;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  left: 110px;
  top: 90px;
  padding-top: 50px;
`

export const UploadTitleContainer = styled.div`
  display: flex;
  width: 111px;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
  margin-left: 24px;
`
export const UploadTitle = styled.p`
  color: #121212;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  color: #121212;
`

export const BackgroundRemoverHeading = styled.p`
  color: #121212;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 15px 0px 0px 15px;
`

export const DottedBorder = styled.div`
  display: flex;
  flex-direction: column;
  width: 241px;
  height: 147px;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #ff8ea5, #cc95ff, #88e7ff) border-box;
  border-radius: 4px;
  border: 1px dashed white;
  padding: 10px 5px 22px 5px;
`

export const UploadImage = styled.img`
  width: 23px;
  height: 23px;
  align-self: center;
`

export const BrowseDiv = styled.div<{ marginTop: number; height: number }>`
  width: 169px;
  height: ${(props) => props.marginTop}px;
  margin-top: ${(props) => props.marginTop}px;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
`

export const DragText = styled.span`
  color: #121212;
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`
export const BrowseText = styled.span`
  background: linear-gradient(
    90deg,
    rgba(255, 142, 165, 0.87) 90.38%,
    rgba(204, 149, 255, 0.87) 100.28%,
    rgba(136, 231, 255, 0.87) 107.59%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  align-self: center;
  cursor: pointer;
  line-height: 24px;
`

export const InfoText = styled.span`
  color: rgba(18, 18, 18, 0.5);
  text-align: center;
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`

export const UploadButton = styled.button`
  width: 122px;
  height: 50px;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #ff8ea5, #cc95ff, #88e7ff) border-box;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0px 4px 4px 0px #bdf4ff;
  color: ${Theme.BLACK_COLOR};
  margin-right: 50px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 25px;
`

export const Column = styled.div<{
  justifyContent: string
  alignItems: string
  marginBottom: number
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-bottom: ${(props) => props.marginBottom}px;
`

export const ImageProcessed = styled.img`
  width: 502px;
  height: 502px;
  object-fit: cover;
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
