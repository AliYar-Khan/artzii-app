import React, { useEffect, useRef, useState } from 'react'
import {
  WrapperDiv,
  Container,
  LeftContainer,
  UploadTitleContainer,
  UploadTitle,
  DottedBorder,
  UploadImage,
  BrowseDiv,
  DragText,
  BrowseText,
  InfoText,
  UploadButton,
  BackgroundRemoverHeading,
  Column,
  ImageProcessed,
  LoaderContainer,
  LoaderDiv
} from './style'
import imglyRemoveBackground from '@imgly/background-removal'
import UploadIcon from '../../assets/uploadicon.png'
import loadImage from 'blueimp-load-image'
const BackgroundRemover = () => {
  const [imageAfterRemoval, setImageAfterRemoval] = useState<any>('')
  const [imageFile, setImageFile] = useState<any>('')
  const inputRef = useRef<any>()
  const [loading, setLoading] = useState(false)

  const handleDrag = function (e: any) {
    e.preventDefault()
  }

  const handleDrop = function (e: any) {
    e.preventDefault()
    setImageFile(e.dataTransfer.files[0])
  }

  useEffect(() => {
    if (imageAfterRemoval !== '') {
      setLoading(false)
    }
  }, [imageAfterRemoval])

  useEffect(() => {
    if (imageFile) {
      setLoading(true)
      console.log('====================================')
      console.log('image file --->', imageFile)
      console.log('====================================')
      loadImage(imageFile, {
        canvas: true
      }).then((res: any) => {
        res.image.toBlob((imageBlob: any) => {
          imglyRemoveBackground(imageBlob)
            .then((blob: Blob) => {
              // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
              console.log('====================================')
              console.log('blob  --->', blob)
              console.log('====================================')
              const url = URL.createObjectURL(blob)
              setImageAfterRemoval(url)
            })
            .catch((err) => {
              console.log('====================================')
              console.log('err  --->', err)
              console.log('====================================')
            })
        })
      })
    }
  }, [imageFile])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageAfterRemoval
    link.setAttribute('download', 'image.png') //or any other extension
    document.body.appendChild(link)
    link.click()
  }

  return (
    <WrapperDiv>
      <LeftContainer>
        <UploadTitleContainer onDragOver={handleDrag} onDrop={handleDrop}>
          <input
            ref={inputRef}
            type='file'
            style={{ display: 'none' }}
            multiple={false}
            onChange={(e) => {
              if (e.target.files) {
                setImageFile(e.target.files[0])
              }
            }}
          />
          <UploadTitle>Upload File</UploadTitle>
          <DottedBorder>
            <UploadImage src={UploadIcon} />
            <BrowseDiv marginTop={25} height={48}>
              <DragText>Drag and Drop,</DragText>
              <span style={{ alignSelf: 'center' }}>
                <DragText>or </DragText>
                <BrowseText onClick={() => inputRef.current?.click()}>
                  Browse
                </BrowseText>
              </span>
            </BrowseDiv>
            <BrowseDiv marginTop={15} height={20}>
              <InfoText>Images file only (.png or .jpg)</InfoText>
            </BrowseDiv>
          </DottedBorder>
        </UploadTitleContainer>
      </LeftContainer>
      <Container>
        {!loading ? (
          <>
            <Column
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              marginBottom={0}
            >
              <BackgroundRemoverHeading>
                Background Remover
              </BackgroundRemoverHeading>
            </Column>
            <Column
              justifyContent={'center'}
              alignItems={'center'}
              marginBottom={200}
            >
              {imageAfterRemoval !== '' ? (
                <ImageProcessed src={imageAfterRemoval} />
              ) : (
                <div
                  style={{
                    width: 402,
                    height: 402
                  }}
                />
              )}
            </Column>
            <Column
              justifyContent={'center'}
              alignItems={'center'}
              marginBottom={0}
            >
              <UploadButton onClick={handleDownload}>Download</UploadButton>
              {/* <UploadButton>Designer</UploadButton> */}
            </Column>
          </>
        ) : (
          <LoaderContainer>
            <LoaderDiv></LoaderDiv>
          </LoaderContainer>
        )}
      </Container>
    </WrapperDiv>
  )
}

export default BackgroundRemover
