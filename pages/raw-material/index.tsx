import Carousel from "components/Carousel";
import Layout from "components/Layout";
import styled from "styled-components";
import NewHeader from "components/NewHeader";
import Tutorial from "components/Tutorial";
import UnlockBox from "components/UnlockBox";

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
      <SliderContainer>
      <Center><UnlockBox /></Center>
      <NewHeader />      
      <Container>
        <Carousel type="image" data={imageData} />
      </Container>
      <Tutorial storageKey="tutorial-raw-material" />
      </SliderContainer>
    </Layout>
  )
}

const Center = styled.div`
   position: fixed;
   z-index: 20;
   top: calc(50% - 67px);
   left: calc(50% + 10px);
   text-align: center;
`;

const SliderContainer=styled.div`
  height: 100vh !important;
`
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
`;
