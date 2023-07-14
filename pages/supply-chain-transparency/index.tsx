import Carousel from "components/Carousel";
import Layout from "components/Layout";
import styled from "styled-components";
import NewHeader from "components/NewHeader";
import Tutorial from "components/Tutorial";
import UnlockBox from "components/UnlockBox";

export default function SupplyChainTransparency() {
  const imageData = [
    {
      src: "/images/SupplyChain_transparency.jpg",
      alt: "Supply Chain Transparency",
    },
  ];

  return (
    <Layout>
      <SliderContainer>
        <Center><UnlockBox /></Center>
        <NewHeader />
        <Container>
          <Carousel type="image" data={imageData} />
        </Container>
        <Tutorial storageKey="supply-chain-transparency" />
      </SliderContainer>
    </Layout>
  );
}

const Center = styled.div`
   position: fixed;
   z-index: 20;
   top: calc(50% - 67px);
   left: calc(50% + 10px);
   text-align: center;
`;

const SliderContainer = styled.div`
  height: 100vh !important;
`;
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
`;
