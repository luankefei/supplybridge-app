import styled from "styled-components"

interface ContainerProps {
  selected: boolean;
}

export default function BrandCard({ logo, title, selected }: any) {
  return (
    <>
      <Container selected={selected}>
        <IconWrapper>
          <Icon src={`/brands/${logo}.png`} />
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
  outline: ${(props) => (props.selected && "4px solid #08979C")};
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding-bottom: 15px;
`;