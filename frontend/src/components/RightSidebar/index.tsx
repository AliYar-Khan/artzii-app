import React from 'react'
import {
  AddPageButton,
  AddPageButton2,
  // CoverButton,
  PageTitle,
  Sidebar,
  // UploadButton,
  WaterMarkRemover
} from './style'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  store: any
  handleUpload: any
  handlePages: () => void
  handleCover: () => void
}

// interface Page {
//   background: string
//   bleed: number
//   children: any[]
//   custom: any
//   duration: number
//   height: any
//   id: string
//   width: any
// }

const RightSideBar = ({ store, handlePages }: Props): JSX.Element => {
  return (
    <Sidebar>
      {/* <CoverButton onClick={handleCover}>Cover</CoverButton>
      <UploadButton onClick={handleUpload}>Upload</UploadButton> */}
      <PageTitle>Pages</PageTitle>
      {store.pages.map(() => (
        <AddPageButton />
      ))}
      <AddPageButton2 onClick={handlePages}>
        <FontAwesomeIcon
          icon={solid('add')}
          style={{ width: '17px', backgroundColor: 'white' }}
        />
      </AddPageButton2>
      <WaterMarkRemover></WaterMarkRemover>
    </Sidebar>
  )
}

export default RightSideBar
