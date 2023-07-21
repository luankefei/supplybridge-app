import styled from "styled-components";
import dynamic from "next/dynamic";
import Carousel from "components/carousel";
import Tutorial from "components/tutorial";
const Layout = dynamic(() => import("components/layout"));
const Header = dynamic(() => import("components/newHeader"));

export default function SliderPage() {
  const imageData = [
    {
      src: "/images/slide1.svg",
      alt: "slide1",
    },
    {
      src: "/images/slide2.svg",
      alt: "slide2",
    },
    {
      src: "/images/slide3.svg",
      alt: "slide3",
    },
    {
      src: "/images/slide4.svg",
      alt: "slide4",
    },
    {
      src: "/images/slide5.svg",
      alt: "slide5",
    },
    {
      src: "/images/slide6.svg",
      alt: "slide6",
    },
    {
      src: "/images/slide7.svg",
      alt: "slide7",
    },
    {
      src: "/images/slide8.svg",
      alt: "slide8",
    },
  ];

  return (
    <Layout>
      <SliderContainer>
        <Header />
        <Container>
          <Carousel type="image" data={imageData} />
        </Container>
        <Tutorial storageKey="tutorial-sustainability" />
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
