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
   margin-top: 20px;
`;

const CarouselWrapper = styled(Carousel)`
   height: 100%;
`;

const Dxx = styled.div`
   text-align:center;
`;

const Slide1 = () => <Dxx>1</Dxx>;
const Slide2 = () => <Dxx>2</Dxx>;
const Slide3 = () => <Dxx>3</Dxx>;

export default function BidderPart () {
   const data: any = [<Slide1 key={0}/>, <Slide2 key={1}/>, <Slide3 key={2}/>];
   return (
      <Container><CarouselContainer>
         <CarouselWrapper type="card" data={data} />
      </CarouselContainer></Container>
   );
}
