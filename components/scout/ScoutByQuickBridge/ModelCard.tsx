import styled from "styled-components"

interface ContainerProps {
  selected: boolean;
}

export default function ModelCard({ title, selected }: any) {
  return (
    <>
      <Container selected={selected}>
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
  border: ${(props) => (props.selected ? "4px solid #08979C" : "4px solid transparent")};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;