import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";

import Icon from "components/Icon";
import { useIndustries } from "requests/useIndustries";
import { useEffect } from "react";
import useStore from "hooks/useStore";

const Layout = dynamic(() => import("components/Layout"));

const lowerMenu = [
  {
    title: "AEROSPACE",
    icon: "aerospace",
    subtitle: "Coming Soon",
    path: "/dashboard/aerospace",
    active: false,
  },
  {
    title: "RAILWAY",
    icon: "railway",
    subtitle: "Coming Soon",
    path: "/dashboard/railway",
    active: false,
  },
  {
    title: "OTHER",
    icon: "other",
    subtitle: "Coming Soon",
    path: "/dashboard/other",
    active: false,
  },
];

export default function Industry() {
  const { searchIndustries } = useIndustries();
  const { industries } = useStore();
  useEffect(() => {
    searchIndustries();
  }, []);

  return (
    <Layout>
      <>
        <Head>
          <title>Choose an Industry | Supply Bridge</title>
          <meta name="description" content="Supply Bridge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          <Title>Choose an Industry</Title>
          <CardContainer>
            {industries
              .filter((x: any) => x?.isActive)
              .map((item: any, index: number) => {
                return (
                  <Link href={`/dashboard/${item?.name.toLowerCase()}`} passHref key={index}>
                    <Card active={item.isActive}>
                      <HeaderContainer>
                        <IconContainer>
                          <img src={item.icon} width={65} height={44} />
                        </IconContainer>
                      </HeaderContainer>
                      <ContentContainer>
                        <SubTitle>{item?.name}</SubTitle>
                      </ContentContainer>
                    </Card>
                  </Link>
                );
              })}
          </CardContainer>
          <CardContainer>
            {industries
              .filter((x: any) => !x?.isActive)
              .map((item: any, index: number) => {
                return (
                  <Link href={`/dashboard/${item?.name.toLowerCase()}`} passHref key={index}>
                    <Card active={item.isActive}>
                      <HeaderContainer>
                        <IconContainer>
                          <img src={item.icon} width={65} height={44} />
                        </IconContainer>
                      </HeaderContainer>
                      <ContentContainer>
                        <SubTitle>{item?.name}</SubTitle>
                      </ContentContainer>
                    </Card>
                  </Link>
                );
              })}
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
  font-size: 30px;
  line-height: 40px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 40px;
`;

const SubTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.secondary};
`;

const Label = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

const CardContainer = styled.div`
  margin-bottom: 32px;
  display: inline-flex;
  gap: 24px;
`;

const Card = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  width: 212px;
  height: 212px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.primary};
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
  border-radius: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;
