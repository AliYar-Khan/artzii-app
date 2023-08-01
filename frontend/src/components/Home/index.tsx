import React from "react";
import { Container, DesignRow, Head2, IllustrationContainer, IllustrationImg, ImageContainer, UploadButton } from "./style";
import "../../utils/style.css";
import HeroBanner from "../../assets/HEROBANNER.png";
import DFrame from '../../assets/DFrame.png';
import AFrame from '../../assets/AFrame.png';
import SFrame from '../../assets/SFrame.png';

const Home = () => {
  return (
    <Container>
      <ImageContainer>
        <img src={HeroBanner} alt="hero" style={{ width: "inherit" }} />
        <h2 className="heading">
          Create Stunning AI Illustrations For Your Books
        </h2>
      </ImageContainer>
      <Head2>
        Upload your story to utilize our Analysis Algorithm Create your book in
        seconds
      </Head2>
      <UploadButton>Upload</UploadButton>
      <DesignRow>
        <IllustrationImg src={DFrame}/>
        <IllustrationImg src={AFrame}/>
        <IllustrationImg src={SFrame}/>
      </DesignRow>
    </Container>
  );
};

export default Home;
