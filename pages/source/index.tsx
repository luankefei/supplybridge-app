import Carousel from "components/Carousel";
import Layout from "components/Layout";
import styled from "styled-components";
import NewHeader from "components/NewHeader";
import Slide1 from "components/source/slides/Slide1";
import Slide2 from "components/source/slides/Slide2";
import Slide3 from "components/source/slides/Slide3";

export default function RawMaterial() {

  const data: React.ReactElement[] = [<Slide1 key={0} />, <Slide2 key={1} />, <Slide3 key={2}/>];


  return (
    <Layout>
      <NewHeader />
      <Container>
        <Carousel type="card" data={data} />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;