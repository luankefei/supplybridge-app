import { Skeleton } from "@mui/material";
import styled from "styled-components"

export default function BrandCardSkeleton() {
  return (
    <>
      <Container>
        <IconWrapper>
          <Icon variant="rounded" />
        </IconWrapper>
        <Title variant="text" width="40px" />
      </Container>
    </>
  )
}

const Container = styled.span`
  width: 124px;
  height: 124px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  border: 4px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
  &:active {
    border: 4px solid #445B66;
    box-shadow: none;
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 80%;
`;

const Icon = styled(Skeleton)`
  width: 80px;
  height: auto;
`;

const Title = styled(Skeleton)`
  height: 16px;
  color: #808080;
  font-size: 0.75rem;
`;