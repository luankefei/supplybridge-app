import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import Image from "next/image";
import styled from "styled-components";
export default function SliderPage() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,       
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <StyledSlider {...settings}>
       <Image src="/images/slide1.svg" width={1056} height={724} alt="slide1" />
       <Image src="/images/slide2.svg" width={1056} height={724} alt="slide2" />
       <Image src="/images/slide3.svg" width={1056} height={724} alt="slide3" />
       <Image src="/images/slide4.svg" width={1056} height={724} alt="slide4" />
       <Image src="/images/slide5.svg" width={1056} height={724} alt="slide5" />
       <Image src="/images/slide6.svg" width={1056} height={724} alt="slide6" />
       <Image src="/images/slide7.svg" width={1056} height={724} alt="slide7" />
       <Image src="/images/slide8.svg" width={1056} height={724} alt="slide8" />
      </StyledSlider>
    );
  }

  const StyledSlider=styled(Slider)`
   width: 1056px;
   height: 724px;
     margin: 10px auto;
    .slick-dots li button:before {
    color: #08979C;
    font-size: 20px;
    line-height: 20px;

  }

  .slick-prev {
    left: -1px;
    z-index: 1;
  }
  .slick-prev:before {
    content: '←';
    font-size: 30px;
    color: white;
}
  .slick-next{
    right: 3px;
    z-index: 1;
  }
  .slick-next:before {
    font-size: 30px;
    color: white;
  }
  /* .slick-active button:before {
    color: #08979C !important;
    font-size: 20px;
    line-height: 20px;
  } */
  
  `