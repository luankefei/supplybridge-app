import Layout from "components/Layout";
import Header from "components/NewHeader";
import Image from "next/image";
import styled from "styled-components";

export default function TotalSolutionPage() {
  return (
    <Layout>
      <Header title="Total Solution"></Header>

      <Container>
        <Image
          src="/images/total-solution.svg"
          width={864}
          height={748}
          alt="solution page image"
        />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px auto;
`;

const Title = styled.h4`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  align-items: center;
  color: #1a1a1a;
`;
