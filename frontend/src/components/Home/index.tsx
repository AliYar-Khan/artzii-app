import React, { useState, useEffect } from 'react'
import {
  Container,
  DesignRow,
  Designs,
  Head1,
  // Head2,
  Head5,
  // IllustrationContainer,
  IllustrationImg,
  ImageContainer,
  DesignImage,
  Design
  // UploadButton
} from './style'
import '../../utils/style.css'
import HeroBanner from '../../assets/HEROBANNER.png'
import DFrame from '../../assets/DFrame.png'
import AFrame from '../../assets/AFrame.png'
import SFrame from '../../assets/SFrame.png'
import { client } from 'src/apiClient/apiClient'
import { useStores } from 'src/store/rootStore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import Designer from '../Designer'
// import { Navigate } from 'react-router-dom'
interface Design {
  name: string
  conver: string
}

interface Props {
  setActiveTab: (tabId: any) => void
}

const Home = (props: Props): JSX.Element => {
  const store = useStores()
  const [designs, setDesigns] = useState<Design[]>([])
  const [itemsDisplay, setItemsDisplay] = useState<any>()

  useEffect(() => {
    client
      .get('/design/', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': store.authStore.authToken
        }
      })
      .then(async (response) => {
        if (response.data.success === true) {
          setDesigns(response.data.designs)
        }
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          toast.error('Token Expired. Login Again!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          await store.logout()
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        } else {
          toast.error(err.response.data.message, {
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
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editDesign = (itemId: string): void => {
    store.designStore.updateDesignId(itemId)
    props.setActiveTab(2)
  }

  const isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // validate fragment locator
    return !!urlPattern.test(urlString)
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
      <ImageContainer>
        <img src={HeroBanner} alt='hero' style={{ width: 'inherit' }} />
        <h2 className='heading'>
          Create Stunning AI Illustrations For Your Books
        </h2>
      </ImageContainer>
      {/* <Head2>
        Upload your story to utilize our Analysis Algorithm Create your book in
        seconds
      </Head2>
      <UploadButton>Upload</UploadButton> */}
      <DesignRow>
        <IllustrationImg src={DFrame} onClick={() => props.setActiveTab(2)} />
        <IllustrationImg src={AFrame} onClick={() => props.setActiveTab(4)} />
        <IllustrationImg src={SFrame} onClick={() => props.setActiveTab(3)} />
      </DesignRow>
      <DesignRow>
        <Head1>Your Designs</Head1>
      </DesignRow>
      <Designs>
        {designs?.map((design: any, rowIndex: React.Key | null | undefined) => (
          <div
            key={rowIndex}
            onClick={() => {
              editDesign(design.id)
            }}
          >
            {isValidUrl(design.cover) ? (
              <DesignImage
                src={design.cover}
                width={244}
                height={148}
                alt={design.name}
              />
            ) : (
              <Design background={design.cover}></Design>
            )}
            <Head5>{design.name}</Head5>
            <Head5>{design.size}</Head5>
          </div>
        ))}
      </Designs>
    </Container>
  )
}

export default Home
