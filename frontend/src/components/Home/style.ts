import styled from 'styled-components'
import Theme from '../../constants/theme'

export const ImageContainer = styled.div`
  position: relative;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 86vw;
  z-index: 100;
`

export const Head1 = styled.h1`
  margin-left: 50px;
  font-size: 32px;
  font-weight: 900;
  text-align: left;
  color: #121212;
  font-family: 'Poppins', sans-serif;
`

export const Head2 = styled.h2`
  font-size: 25px;
  font-weight: 800;
  text-align: center;
  line-height: 30px;
  width: 620px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
`

export const Head5 = styled.h5`
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  line-height: 10px;
  width: 244px;
  margin-left: 50px;
`

export const UploadButton = styled.button`
  width: 100px;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 4px 4px #bdf4ff;
  border-radius: 4px;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  color: ${Theme.BLACK_COLOR};
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
`

export const DesignRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  width: inherit;
`

export const Designs = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 250px;
  padding: 10px;
`

export const IllustrationContainer = styled.div`
  flex-direction: column;
`

export const IllustrationImg = styled.img`
  width: 310px;
  height: 208px;
  border-radius: 4px;
  margin-right: auto;
  margin-left: auto;
  cursor: pointer;
`

export const DesignImage = styled.img`
  width: 244px;
  height: 148px;
  margin-left: 50px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
`

export const Design = styled.div<{
  background: string
}>`
  width: 244px;
  height: 148px;
  margin-left: 50px;
  background-color: ${(props) => props.background};
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
`
