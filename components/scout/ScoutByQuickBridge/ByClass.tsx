import { useState } from "react";
import styled from "styled-components";
import BrandCard from "./BrandCard";

export default function ByClass() {
  const [selected, setSelected] = useState("");

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
    } else {
      setSelected("");
    }
  };

  const ClassData = {
    mass: [
      { logo: "ford-logo", title: "Ford" },
      { logo: "aiways-logo", title: "Aiways" },
      { logo: "byd-logo", title: "BYD" },
      { logo: "chery-logo", title: "Chery" },
      { logo: "greatwallmotors-logo", title: "Great Wall" },
      { logo: "nissan-logo", title: "Nissan" },
      { logo: "honda-logo", title: "Hongda" },
      { logo: "sonomotors-logo", title: "Sono" },
      { logo: "volkswagen-logo", title: "VW" },
    ],
    premium: [
      { logo: "rivian-logo", title: "Rivian" },
      { logo: "tesla-logo", title: "Tesla" },
      { logo: "hiphi-logo", title: "HiPhi" },
      { logo: "liauto-logo", title: "Li Auto" },
      { logo: "nio-logo", title: "Nio" },
      { logo: "hyundai-logo", title: "Hyundai" },
    ],
    luxury: [
      { logo: "bmw-logo", title: "BMW" },
      { logo: "mercedesbenz-logo", title: "Mercedes-Benz" },
      { logo: "audi-logo", title: "Audi" },
    ],
    sports: [
      { logo: "astonmartin-logo", title: "Aston Martin" },
      { logo: "koenigsegg-logo", title: "Koenigsegg" },
    ],
  };

  return (
    <>
      <Container>
        <Section>
          <Title>Volume</Title>
          <Brands>
            {ClassData.mass.map((item: any, index) => {
              return (
                <>
                  <CardWrapper onClick={() => onClick(item.title)}>
                    <BrandCard
                      key={index}
                      logo={item.logo}
                      title={item.title}
                      selected={selected === item.title}
                    />
                  </CardWrapper>
                </>
              );
            })}
          </Brands>
        </Section>
        <Section>
          <Title>EV</Title>
          <Brands>
            {ClassData.premium.map((item: any, index) => {
              return (
                <>
                  <CardWrapper onClick={() => onClick(item.title)}>
                    <BrandCard
                      key={index}
                      logo={item.logo}
                      title={item.title}
                      selected={selected === item.title}
                    />
                  </CardWrapper>
                </>
              );
            })}
          </Brands>
        </Section>
        <Section>
          <Title>Luxury</Title>
          <Brands>
            {ClassData.luxury.map((item: any, index) => {
              return (
                <>
                  <CardWrapper onClick={() => onClick(item.title)}>
                    <BrandCard
                      key={index}
                      logo={item.logo}
                      title={item.title}
                      selected={selected === item.title}
                    />
                  </CardWrapper>
                </>
              );
            })}
          </Brands>
        </Section>
        <Section>
          <Title>Sports</Title>
          <Brands>
            {ClassData.sports.map((item: any, index) => {
              return (
                <>
                  <CardWrapper onClick={() => onClick(item.title)}>
                    <BrandCard
                      key={index}
                      logo={item.logo}
                      title={item.title}
                      selected={selected === item.title}
                    />
                  </CardWrapper>
                </>
              );
            })}
          </Brands>
        </Section>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 30px;
`;

const Title = styled.span`
  margin-bottom: 30px;
`;

const Brands = styled.span<any>`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  gap: 24px;
  @media (max-width: 1200px) {
    grid-template-columns: auto auto auto;
  }
`;

const CardWrapper = styled.span`
  cursor: pointer;
`;
