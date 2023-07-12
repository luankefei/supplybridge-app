import { theme } from "config/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Slide1 from "./source/slides/Slide1";
const Indicator = ({ className, position, length, onIndicatorClick }: any) => (
  <IndicatorContainer className={className}>
    {Array.from({ length }, (value, index) => (
      <IndicatorDot
        key={index}
        isActive={position === index}
        onClick={() => onIndicatorClick(index)}
      />
    ))}
  </IndicatorContainer>
);

const Gallery = ({ children }: any) => {
  const [position, setPosition] = useState(0);
  const directions = {
    NEXT: "next",
    PREV: "previous",
  };

  const handlePreviousClick = () => {
    handleArrowClick(directions.PREV);
  };

  const handleNextClick = () => {
    handleArrowClick(directions.NEXT);
  };

  const handleArrowClick = (direction: any) => {
    let newPosition = 0;
    if (direction === directions.NEXT) {
      newPosition = position === children.length - 1 ? 0 : position + 1;
    } else {
      newPosition = position === 0 ? children.length - 1 : position - 1;
    }
    handleSlide(newPosition);
  };

  const handleSlide = (position: any) => {
    setPosition(position);
  };

  const handleScroll = (e: any) => {
    if (e.currentTarget.id !== "carousel-container") return;
    e.preventDefault();
    handleArrowClick(e.wheelDelta < 0 ? directions.NEXT : directions.PREV);
  };

  return (
    <Wrapper>
      <CarouselContainer>
        <CarouselImg position={position}>
          {children.map((child: any) => (
            <CarouselItem key={child.key}>{child}</CarouselItem>
          ))}
        </CarouselImg>
      </CarouselContainer>
      {children.length > 1 && position !== 0 && (
        <PreviousButton onClick={() => handlePreviousClick()}>
          <IconWrapper>
            <Icon src="/icons/slider-right-arrow.svg" />
          </IconWrapper>
        </PreviousButton>
      )}
      {children.length > 1 && position !== children.length - 1 && (
        <NextButton onClick={() => handleNextClick()}>
          <IconWrapper>
            <Icon src="/icons/slider-left-arrow.svg" />
          </IconWrapper>
        </NextButton>
      )}
      <IndicatorStyled
        length={children.length}
        position={position}
        onIndicatorClick={handleSlide}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: ${theme.dimension.cardMaxWidth};
`;

const CarouselContainer = styled.div<any>`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const CarouselImg = styled.div<any>`
  display: flex;
  transition: transform 0.45s ease;
  transform: ${(props) => `translateX(${props.position * -100}%)`};
`;

const CarouselItem = styled.div`
  display: flex;
  flex: 1 0 100%;
  height: 100%;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  cursor: pointer;
  top: calc(50% - 0.5 * 3rem);
  padding: 0;
  display: flex;
  justify-content: center;
  z-index: 3;
`;

const PreviousButton = styled(ArrowButton)`
  position: absolute;
  left: 10px;
`;

const IconWrapper = styled.span`
  background: #ffffff;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 2px solid #08979c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.1);
  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const Icon = styled.img``;

const NextButton = styled(ArrowButton)`
  position: absolute;
  right: 10px;
`;

const IndicatorStyled = styled(Indicator)`
  display: flex;
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  z-index: 4;
`;

const IndicatorDot = styled.div<any>`
  height: 16px;
  width: 16px;
  background-color: ${({ isActive }) => (isActive ? "#08979C;" : "#E6E6E6")};
  transition: background 450ms ease;
  border-radius: 50%;
  margin-right: 15px;
  cursor: pointer;
  z-index: 4;
`;

const Image = styled.img`
  width: 90%;
  height: 100%;
  margin 0 auto;
`;

export default function Carousel({ data, type }: any) {
  return (
    <>
      <Gallery>
        {type === "image"
          ? data.map((item: any, index: any) => (
              <Image key={index} src={item.src} alt={item.alt} />
            ))
          : data.map((card: any, index: any) => card)}
      </Gallery>
    </>
  );
}
