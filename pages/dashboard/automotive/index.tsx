import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";

import Icon from "components/icon";
const Layout = dynamic(() => import("components/layout"));

const upperMenu = [
  {
    title: "Scout",
    icon: "scout",
    path: "/dashboard/automotive/scout",
    active: true,
  },
  {
    title: "Source",
    icon: "source",
    path: "/dashboard/automotive/source",
    active: true,
  },
  {
    title: "Evaluate",
    icon: "evaluate",
    path: "/dashboard/automotive/evaluate",
    active: false,
  },
];

const lowerMenu = [
  {
    title: "Trace",
    icon: "trace",
    path: "/dashboard/automotive/trace",
    active: false,
  },
  {
    title: "Finance",
    icon: "finance",
    path: "/dashboard/automotive/finance",
    active: false,
  },
  {
    title: "Transport",
    icon: "transport",
    path: "/dashboard/automotive/transport",
    active: false,
  },
];

export default function Automotive() {
  return (
    <Layout>
      <>
        <Head>
          <title>Automotive | Supply Bridge</title>
          <meta name="description" content="Supply Bridge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          <Title>INDIVIDUAL SOLUTIONS</Title>
          <SubTitle>
            Choose from our supply chain as a service solutions.
          </SubTitle>
          <CardContainer>
            {upperMenu.map((uprMenu, index) => (
              <Link
                href={uprMenu.active ? uprMenu.path : "#"}
                passHref
                key={`upper_${index}`}
              >
                <Card active={uprMenu.active}>
                  <IconContainer>
                    <Icon src={uprMenu.icon} width={60} height={37} />
                  </IconContainer>
                  <Label>{uprMenu.title}</Label>
                </Card>
              </Link>
            ))}
          </CardContainer>
          <CardContainer>
            {lowerMenu.map((lwrMenu, index) => (
              <Link
                href={lwrMenu.active ? lwrMenu.path : "#"}
                passHref
                key={`upper_${index}`}
              >
                <Card active={lwrMenu.active}>
                  <IconContainer>
                    <Icon src={lwrMenu.icon} width={60} height={37} />
                  </IconContainer>
                  <Label>{lwrMenu.title}</Label>
                </Card>
              </Link>
            ))}
          </CardContainer>
          <Title>SUPPLY BRIDGE TOTAL SOLUTION</Title>
          <SubTitle>Build an agile and sustainable supply chain.</SubTitle>
          <CardContainer>
            <Link href={"#"} passHref>
              <Card active={false}>
                <IconContainer>
                  <Icon src={"solution"} width={60} height={37} />
                </IconContainer>
                <Label>Build Total Solution</Label>
              </Card>
            </Link>
          </CardContainer>
        </Container>
      </>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #2a3840;
  margin-bottom: 8px;
  margin-top: 50px;
`;

const SubTitle = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 104px;
`;

const Label = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #445b66;
`;

const CardContainer = styled.div`
  display: inline-flex;
  gap: 32px;
  margin-bottom: 68px;
`;

const Card = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 122px;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  background: #f5f5f5;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
`;

const IconContainer = styled.div`
  position: absolute;
  top: -50px;
  left: 0px;
  right: 0px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
`;
