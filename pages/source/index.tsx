import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import styled from "styled-components";
import dynamic from "next/dynamic";
import Icon from "components/Icon";
import Slide1 from "components/source/slides/Slide1";
import Slide2 from "components/source/slides/Slide2";
import Slide3 from "components/source/slides/Slide3";
import { useEffect, useRef, useState } from "react";
const Layout = dynamic(() => import("components/Layout"));
const Header = dynamic(() => import("components/NewHeader"));
export default function SliderPage() {
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Icon src="next" width={40} height={40} />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Icon src="prev" width={40} height={40} />
      </div>
    );
  };

  const slideCard = (e: any) => {
    if (e.currentTarget.id !== 'slider-wrapper') return;
    e.preventDefault();
    if (slider === null) return 0;
    e.wheelDelta < 0
      ? slider?.current?.slickNext()
      : slider?.current?.slickPrev();
  };

  useEffect(() => {
    let slideWrapper = document.getElementById("slider-wrapper");
    slideWrapper?.addEventListener("wheel", slideCard);
    return () => {
      slideWrapper?.removeEventListener("wheel", slideCard);
    };
  }, []);

  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  

  const slider = useRef<Slider>(null);
  return (
    <Layout>
      <Header />
      <Container>
      <SliderWrapper id="slider-wrapper">
      <StyledSlider {...settings} ref={slider}>
        <Slide1 />
        <Slide2 />
        <Slide3 />
      </StyledSlider>
      </SliderWrapper>
      </Container>
    </Layout>
  );
}

const Container=styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SliderWrapper=styled.div``
const StyledSlider = styled(Slider)`
  width: 1056px;
  height: 724px;
  margin: 0px auto;

  .slick-dots {
    bottom: -68px !important;
  }
  .slick-dots li button:before {
    color: #08979c;
    font-size: 20px;
    line-height: 20px;
  }

  .slick-prev {
    left: -20px;
    z-index: 1;
    img {
    object-fit: none;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 10%), 0px 1px 2px rgb(0 0 0 / 6%);
    border-radius: 50%;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .slick-prev:before {
    display: none;
  }
  .slick-next {
    right: 0px;
    z-index: 1;
    img {
    object-fit: none;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 10%), 0px 1px 2px rgb(0 0 0 / 6%);
    border-radius: 50%;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .slick-next:before {
    display: none;
  }
  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus {
    background: transparent;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 722px;
    height: 724px;
    margin: 0px 20px;
  }

  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 500px;
    height: 724px;
    margin: 0px 20px;
  }
`;
