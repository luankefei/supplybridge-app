import Carousel from "components/Carousel";
import styled from "styled-components";

const Container = styled.div`
   flex: 1 0 auto;
`;

const CarouselContainer = styled.div`
   width: 100%;
   height: 80%;
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 60px;
`;

const CarouselWrapper = styled(Carousel)`
   height: 100%;
`;

const SlideContainer = styled.div`
   text-align:center;
   margin: auto;
   > img {
      height: 710px;
   }
`;

const Slide1 = () => <SlideContainer><img src="https://cdn-stage.supplybridge.com/images/preview/bidder1.jpg" /></SlideContainer>;
const Slide2 = () => <SlideContainer><img src="https://cdn-stage.supplybridge.com/images/preview/bidder2.jpg" /></SlideContainer>;
const Slide3 = () => <SlideContainer><img src="https://cdn-stage.supplybridge.com/images/preview/bidder3.jpg" /></SlideContainer>;

export default function BidderPart () {
   const data: any = [<Slide1 key={0}/>, <Slide2 key={1}/>, <Slide3 key={2}/>];
   return (
      <Container><CarouselContainer>
         <CarouselWrapper type="card" data={data} />
      </CarouselContainer></Container>
   );
}
