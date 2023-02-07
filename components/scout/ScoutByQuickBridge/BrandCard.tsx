import styled from "styled-components"
import _ from "lodash";

interface ContainerProps {
  selected: boolean;
  clickable: boolean;
}

export default function BrandCard({ logo, title, selected, clickable = true }: any) {
  return (
    <>
      <Container selected={selected} clickable={clickable}>
        <IconWrapper>
          {
            _.startsWith(logo, "http") ?
              <Icon src={logo} /> :
              <Icon src={`/brands/${logo}.png`} />
          }
        </IconWrapper>
        <Title>
          {title}
        </Title>
      </Container>
    </>
  )
}

const Container = styled.span<ContainerProps>`
  width: 124px;
  height: 124px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  border: ${(props) => (props.clickable && props.selected ? "4px solid #08979C" : "4px solid transparent")};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
  &:hover {
    box-shadow: ${(props) => (props.clickable && "0px 0px 8px rgba(0, 0, 0, 0.2)")};
  }
  &:active {
    border: ${(props) => (props.clickable ? "4px solid #445B66" : "4px solid transparent")};
    box-shadow: none;
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 80%;
`;

const Icon = styled.img`
  width: 80px;
  height: auto;
`;

const Title = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #808080;
`;