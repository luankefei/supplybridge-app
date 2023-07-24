import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";

import Icon from "components/icon";

const Menus = [
  {
    title: "RAW MATERIAL",
    icon: "raw-material",
    subtitle: "",
    path: "/dashboard/automotive/source/rawMaterial",
    active: true,
  },
  {
    title: "PROTOTYPE",
    icon: "prototype",
    subtitle: "Coming Soon",
    path: "/dashboard/automotive/source/prototype",
    active: false,
  },
  {
    title: "SERIES PRODUCTION",
    icon: "series-production",
    subtitle: "Coming Soon",
    path: "/dashboard/automotive/source/series-production",
    active: false,
  },
  {
    title: "SPARE PARTS",
    icon: "spare-parts",
    subtitle: "Coming Soon",
    path: "/dashboard/automotive/source/spare-parts",
    active: false,
  },
  {
    title: "MANUFACTURING TOOLS",
    icon: "manufacturing-tools",
    subtitle: "Coming Soon",
    path: "/dashboard/automotive/source/manufacturing-tools",
    active: false,
  },
  {
    title: "3P SERVİCES",
    icon: "raw-material",
    subtitle: "Coming Soon",
    path: "/dashboard/automotive/source/3p-services",
    active: false,
  },
];

export default function Sourcing() {
  return (
    <>
      <Head>
        <title>Sourcing | Supply Bridge</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Link href="/dashboard/automotive/">
          <CloseIcon src="/icons/close-green.svg" />
        </Link>
        <Title>Choose a Segment to Start Sourcing</Title>
        <CardContainer>
          {Menus.map((lwrMenu, index) => (
            <Link
              href={lwrMenu.active ? lwrMenu.path : "#"}
              passHref
              key={`upper_${index}`}
            >
              <Card active={lwrMenu.active}>
                <HeaderContainer>
                  <IconContainer>
                    <Icon src={lwrMenu.icon} width={65} height={44} />
                  </IconContainer>
                </HeaderContainer>
                <ContentContainer>
                  <SubTitle>{lwrMenu.title}</SubTitle>
                  {lwrMenu.subtitle ? <Label>{lwrMenu.subtitle}</Label> : null}
                </ContentContainer>
              </Card>
            </Link>
          ))}
        </CardContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
  position: relative;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 10%;
  top: 5%;
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 40px;
`;

const SubTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.oldSecondary};
`;

const Label = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

const CardContainer = styled.div`
  margin-bottom: 32px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto auto;
  gap: 32px;
`;

const Card = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  width: 212px;
  height: 212px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.secondary};
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
`;

const HeaderContainer = styled.div`
  padding: 12px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
`;

const IconContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
