import React, { useState, useEffect } from "react";
import {
  Container,
  DesignRow,
  Head1,
  Head2,
  Head5,
  IllustrationContainer,
  IllustrationImg,
  ImageContainer,
  DesignImage,
  UploadButton,
} from "./style";
import "../../utils/style.css";
import HeroBanner from "../../assets/HEROBANNER.png";
import DFrame from "../../assets/DFrame.png";
import AFrame from "../../assets/AFrame.png";
import SFrame from "../../assets/SFrame.png";
import { client } from "src/apiClient/apiClient";
import { useStores } from "src/store/rootStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Designer from "../Designer";
import { Navigate } from "react-router-dom";
interface Design {
  name: String;
  conver: String;
}

const Home = (props: any) => {
  const store = useStores();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [itemsDisplay, setItemsDisplay] = useState<any>();

  useEffect(() => {
    client
      .get("/design/", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": store.authStore.authToken,
        },
      })
      .then(async (response) => {
        if (response.data.success === true) {
          setDesigns(response.data.designs);
        }
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          toast.error("Token Expired. Login Again!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          await store.logout();
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  }, []);

  function convertTo2DArray(arr: any[], columns: number) {
    const result = [];
    for (let i = 0; i < arr.length; i += columns) {
      result.push(arr.slice(i, i + columns));
    }
    return result;
  }

  useEffect(() => {
    if (designs.length) {
      const twoD = convertTo2DArray(designs, 4);
      setItemsDisplay(twoD);
    }
  }, [designs]);

  const editDesign = (itemId: string) => {
    store.designStore.updateDesignId(itemId);
    props.setActiveTab(2);
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ImageContainer>
        <img src={HeroBanner} alt="hero" style={{ width: "inherit" }} />
        <h2 className="heading">
          Create Stunning AI Illustrations For Your Books
        </h2>
      </ImageContainer>
      {/* <Head2>
        Upload your story to utilize our Analysis Algorithm Create your book in
        seconds
      </Head2>
      <UploadButton>Upload</UploadButton> */}
      <DesignRow>
        <IllustrationImg src={DFrame} />
        <IllustrationImg src={AFrame} />
        <IllustrationImg src={SFrame} />
      </DesignRow>
      <DesignRow>
        <Head1>Your Designs</Head1>
      </DesignRow>
      <DesignRow>
        {itemsDisplay?.map(
          (row: any[], rowIndex: React.Key | null | undefined) => (
            <div key={rowIndex}>
              {row?.map(
                (
                  item: {
                    id: string;
                    cover: string;
                    name: string;
                  },
                  colIndex: React.Key | null | undefined
                ) => (
                  <div
                    key={colIndex}
                    onClick={() => {
                      editDesign(item.id);
                    }}
                  >
                    <DesignImage
                      src={item.cover}
                      width={244}
                      height={148}
                      alt={item.name}
                    />
                    <Head5>{item.name}</Head5>
                  </div>
                )
              )}
            </div>
          )
        )}
      </DesignRow>
    </Container>
  );
};

export default Home;
