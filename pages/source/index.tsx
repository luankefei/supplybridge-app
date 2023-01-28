import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import styled from "styled-components";
import dynamic from "next/dynamic";
import Icon from "components/Icon";
import Slide1 from "components/source/slides/Slide1";
import Slide2 from "components/source/slides/Slide2";
import Slide3 from "components/source/slides/Slide3";
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
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Layout>
      <Header />
      <StyledSlider {...settings}>
        <Slide1 />
        <Slide2 />
        <Slide3 />
      </StyledSlider>
    </Layout>
  );
}

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
       margin: 0px 20px;
      }
`;
