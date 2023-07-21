import { Skeleton } from "@mui/material";
import styled from "styled-components"

export default function ModelCardSkeleton() {
  return (
    <>
      <Container>
        <Title variant="text" width="60px" />
      </Container>
    </>
  )
}

const Container = styled.span`
  width: 124px;
  height: 124px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  background: #FFFFFF;
  border: 4px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    border: 4px solid #445B66;
    box-shadow: none;
  }
`

const Title = styled(Skeleton)`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;