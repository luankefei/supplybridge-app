import { Divider } from "@mui/material";
import { useState } from "react";
import styled from "styled-components"
import BrandCard from "./BrandCard";
import ModelCard from "./ModelCard";

export default function BySegment() {
  const [selected, setSelected] = useState("")


  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select)
    } else {
      setSelected("")
    }
  }

  const data = [
    {
      brand: {
        logo: "audi-logo",
        title: "Audi",
        models: [
          {
            title: "A4"
          },
          {
            title: "A6"
          },
          {
            title: "A8"
          },
        ]
      }
    },
    {
      brand: {
        logo: "mercedesbenz-logo",
        title: "Mercedes-Benz",
        models: [
          {
            title: "C-Class"
          },
          {
            title: "E-Class"
          },
          {
            title: "S-Class"
          },
        ]
      }
    },
  ]


  return (
    <Container>
      <Segments>
        <SegmentButton>Microcar</SegmentButton>
        <SegmentButton>A-segment</SegmentButton>
        <SegmentButton>B-segment</SegmentButton>
        <SegmentButton>C-segment</SegmentButton>
        <SegmentButton>D-segment</SegmentButton>
        <SegmentButton>E-segment</SegmentButton>
      </Segments>

      <Models>
        <>
          {data?.map((item: any, index: any) => {
            return (
              <>
                <Section key={index}>
                  <Brand>
                    <BrandCard logo={item.brand.logo} title={item.brand.title} clickable={false} />
                  </Brand>
                  <ModelsWrapper>
                    {item?.brand.models?.map((model: any, i: any) => {
                      return (
                        <>
                          <ModelCardWrapper key={i} onClick={() => onClick(model.title)}>
                            <ModelCard title={model.title} selected={selected === model.title} />
                          </ModelCardWrapper>
                        </>
                      )
                    })}
                  </ModelsWrapper>
                </Section>
                {index + 1 !== data.length &&
                  <Divider />
                }
              </>
            )
          })}
        </>
      </Models>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: flex-start;
  width: 100%;
`;

const Segments = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SegmentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 54px;
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-radius: 16px;
`;

const Models = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
`;

const ModelCardWrapper = styled.span`
  cursor: pointer;  
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Brand = styled.div`

`;

const ModelsWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding-right: 132px;
`;
