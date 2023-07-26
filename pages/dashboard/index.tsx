import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { useIndustries } from "requests/useIndustries";
import { useEffect } from "react";
import { useStore } from "hooks/useStore";
import Image from "next/image";

function Industry() {
  const { searchIndustries } = useIndustries();
  const { industries } = useStore();
  useEffect(() => {
    searchIndustries();
  }, []);

  return (
    <>
      <Head>
        <title>Choose an Industry | Supply Bridge</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Title>Choose an Industry to Scout</Title>
        <CardContainer>
          {industries
            .filter((x: any) => x?.isActive)
            .map((item: any, index: number) => {
              return (
                <Link href={`/scout`} passHref key={index}>
                  <Card active={item.isActive}>
                    <HeaderContainer>
                      <IconContainer>
                        <Image
                          src={item.icon}
                          width={65}
                          height={44}
                          alt={item.name}
                        />
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
                <Card active={item.isActive} key={index}>
                  <HeaderContainer>
                    <IconContainer>
                      <Image
                        src={item.icon}
                        width={85}
                        height={54}
                        alt={item.name}
                      />
                    </IconContainer>
                  </HeaderContainer>
                  <ContentContainer>
                    <SubTitle>{item?.name}</SubTitle>
                    <Label>Coming Soon</Label>
                  </ContentContainer>
                </Card>
              );
            })}
        </CardContainer>
      </Container>
    </>
  );
}

export default Industry;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Ubuntu;
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
  color: ${(props) => props.theme.colors.oldSecondary};
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
  border-radius: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;
