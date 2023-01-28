import Carousel from "components/Carousel";
import Layout from "components/Layout";
import styled from "styled-components";

export default function RawMaterial() {

  const imageData = [
    {
      src: "/images/raw-material-1.png",
      alt: "raw-material-1"
    },
    {
      src: "/images/raw-material-2.png",
      alt: "raw-material-2"
    },
    {
      src: "/images/raw-material-3.png",
      alt: "raw-material-3"
    },

  ]


  return (
    <Layout>
      <Container>
        <Carousel imageData={imageData} />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;