import styled from "styled-components";
import dynamic from "next/dynamic";
import Carousel from "components/Carousel";
import Tutorial from "components/Tutorial";
const Layout = dynamic(() => import("components/Layout"));
const Header = dynamic(() => import("components/NewHeader"));

export default function SliderPage() {

  const imageData = [
    {
      src: "/images/slide1.svg",
      alt: "slide1"
    },
    {
      src: "/images/slide2.svg",
      alt: "slide2"
    },
    {
      src: "/images/slide3.svg",
      alt: "slide3"
    },
    {
      src: "/images/slide4.svg",
      alt: "slide4"
    },
    {
      src: "/images/slide5.svg",
      alt: "slide5"
    },
    {
      src: "/images/slide6.svg",
      alt: "slide6"
    },
    {
      src: "/images/slide7.svg",
      alt: "slide7"
    },
    {
      src: "/images/slide8.svg",
      alt: "slide8"
    },
  ]

  return (
    <Layout>
      <Header />
      <Container>
        <Carousel type="image" data={imageData} />
      </Container>
      <Tutorial storageKey="tutorial-sustainability" />
    </Layout>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
