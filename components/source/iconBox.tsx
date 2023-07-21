import { useState } from "react";
import styled from "styled-components";
import Icon from "../Icon";
interface Props {
  title: string;
  iconSrc: string;
  iconWidth?: number;
  iconHeight?: number;
  padding?: string;
  margin?: string;
   ischecked:boolean;
  // onClick: React.MouseEventHandler
}

const IconBox = ({
  title,
  iconSrc,
  iconHeight = 120,
  iconWidth = 120,
  padding = "0px",
  margin = "0px",
  ischecked,
  //onClick
}: Props) => {
 

  return (
    <StyledBox
     
      padding={padding}
     
      margin={margin}
      ischecked={ischecked}
      // onClick={onClick}
    >
      <BoxInfo>
        <Icon src={iconSrc} width={iconWidth} height={iconHeight} />
        <Title>{title}</Title>
      </BoxInfo>
    </StyledBox>
  );
};

const StyledBox = styled.div<{
  ischecked: boolean;
  padding: string;
  margin: string;
}>`
  width: 290px;
  height: 196px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: ${(props) => `${props.padding}`};
  margin: ${(props) => `${props.margin}`};
  background-color: #FFFFFF;
  border-radius: 16px;
 // cursor: pointer;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
z-index: 1;
  border: ${(props) =>
    props.ischecked ? "4px solid #08979c" : "1px solid #E5E7EB"};

/* &:hover {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.18);
  }
  &:active{
    border: 4px solid #445B66;
  }

  img{
    cursor: pointer;
  } */
`;

const BoxInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  margin-top: 25px;
`;

const Title = styled.h4`
  text-transform: capitalize;
  font-family: Inter;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
`;
export default IconBox;
