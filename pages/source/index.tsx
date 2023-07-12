import Carousel from "components/Carousel";
import Layout from "components/Layout";
import styled from "styled-components";
import NewHeader from "components/NewHeader";
import Slide1 from "components/source/slides/Slide1";
import Slide2 from "components/source/slides/Slide2";
import Slide3 from "components/source/slides/Slide3";
import Tutorial from "components/Tutorial";

export default function SourcePage() {
  const data: React.ReactElement[] = [
    <Slide1 key={0} />,
    <Slide2 key={1} />,
    <Slide3 key={2} />,
  ];

  return (
    <Layout>
      <NewHeader />
      <SliderContainer>
        <Container>
          <Carousel type="card" data={data} />
        </Container>
        <Tutorial storageKey={"tutorial-source"} />
      </SliderContainer>
    </Layout>
  );
}

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
