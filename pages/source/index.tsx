import Carousel from "components/carousel";
import Layout from "components/layout";
import styled from "styled-components";
import NewHeader from "components/newHeader";
import Slide1 from "components/source/slides/slide1";
import Slide2 from "components/source/slides/slide2";
import Slide3 from "components/source/slides/slide3";
import Tutorial from "components/tutorial";

export default function SourcePage() {
  const data: React.ReactElement[] = [
    <Slide1 key={0} />,
    <Slide2 key={1} />,
    <Slide3 key={2} />,
  ];

  return (
    <Layout pageTitle="Source">
      <NewHeader />
      <SliderContainer>
        <Carousel type="card" data={data} />
        <Tutorial storageKey={"tutorial-source"} />
      </SliderContainer>
    </Layout>
  );
}

const SliderContainer = styled.div``;
