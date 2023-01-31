import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Icon from "components/Icon";
import { useEffect, useRef } from "react";
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
    if (slider === null) return 0;

    e.wheelDelta > 0
      ? slider?.current?.slickNext()
      : slider?.current?.slickPrev();
  };
  useEffect(() => {
    window.addEventListener("wheel", slideCard);
    return () => {
      window.removeEventListener("wheel", slideCard);
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
      <StyledSlider {...settings} ref={slider}>
        <Image
          src="/images/slide1.svg"
          width={1056}
          height={700}
          alt="slide1"
        />
        <Image
          src="/images/slide2.svg"
          width={1056}
          height={700}
          alt="slide2"
        />
        <Image
          src="/images/slide3.svg"
          width={1056}
          height={700}
          alt="slide3"
        />
        <Image
          src="/images/slide4.svg"
          width={1056}
          height={700}
          alt="slide4"
        />
        <Image
          src="/images/slide5.svg"
          width={1056}
          height={700}
          alt="slide5"
        />
        <Image
          src="/images/slide6.svg"
          width={1056}
          height={700}
          alt="slide6"
        />
        <Image
          src="/images/slide7.svg"
          width={1056}
          height={700}
          alt="slide7"
        />
        <Image
          src="/images/slide8.svg"
          width={1056}
          height={700}
          alt="slide8"
        />
      </StyledSlider>
    </Layout>
  );
}

const StyledSlider = styled(Slider)`
  width: 1056px;
  height: 700px;
  margin: 0px auto;
  .slick-dots{
    bottom: -44px !important;
}
  .slick-dots li button:before {
    color: #08979c;
    font-size: 20px;
    line-height: 20px;
    img {
      @media (max-width: ${(props) => props.theme.size.laptop}) {
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        width: 100%;
        height: 500px;
      }

      @media (max-width: ${(props) => props.theme.size.tablet}) {
        width: 100%;
        height: 450px;
      }
    }
  }
 
  .slick-prev {
    left: -1px;
    z-index: 1;
    img {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .slick-prev:before {
    display: none;
  }
  .slick-next {
    right: 20px;
    z-index: 1;
    img {
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
`;