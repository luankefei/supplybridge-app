import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import Image from "next/image";
import styled from "styled-components";
<<<<<<< HEAD
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("components/Layout"));
const Header = dynamic(() => import("components/NewHeader"));
=======
>>>>>>> da1a2037b7fb0e5184ef15a5b5f351dfacde33f2
export default function SliderPage() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,       
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
<<<<<<< HEAD
      <Layout>
      <Header title="Sustainability" />
      <StyledSlider {...settings}>
       <Image src="/images/slide1.svg" width={1056} height={700} alt="slide1" />
       <Image src="/images/slide2.svg" width={1056} height={700} alt="slide2" />
       <Image src="/images/slide3.svg" width={1056} height={700} alt="slide3" />
       <Image src="/images/slide4.svg" width={1056} height={700} alt="slide4" />
       <Image src="/images/slide5.svg" width={1056} height={700} alt="slide5" />
       <Image src="/images/slide6.svg" width={1056} height={700} alt="slide6" />
       <Image src="/images/slide7.svg" width={1056} height={700} alt="slide7" />
       <Image src="/images/slide8.svg" width={1056} height={700} alt="slide8" />
      </StyledSlider>
  </Layout>
     
=======
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
>>>>>>> da1a2037b7fb0e5184ef15a5b5f351dfacde33f2
    );
  }

  const StyledSlider=styled(Slider)`
   width: 1056px;
<<<<<<< HEAD
   height: 700px;
     margin: 0px auto;
=======
   height: 724px;
     margin: 10px auto;
>>>>>>> da1a2037b7fb0e5184ef15a5b5f351dfacde33f2
    .slick-dots li button:before {
    color: #08979C;
    font-size: 20px;
    line-height: 20px;
<<<<<<< HEAD
    img{
    @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 100%;
    height: 500px;
  }  

  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 100%;
    height: 450px;
  } 
    }
=======
>>>>>>> da1a2037b7fb0e5184ef15a5b5f351dfacde33f2

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