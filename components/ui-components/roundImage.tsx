/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";

const RoundImage = ({
  src,
  alt = "image",
  size = 24,
  className,
}: {
  src: string;
  alt?: string;
  size: number;
  className?: string;
}) => {
  return (
    <ImageContainer className={className} size={`${size}px`}>
      <img src={src} alt={alt} />
    </ImageContainer>
  );
};

const ImageContainer = styled.div<any>`
  margin-right: 5px;
  width: ${(props) => props.size || "24px"};
  height: ${(props) => props.size || "24px"};
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default RoundImage;
