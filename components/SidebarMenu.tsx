import Link from "next/link";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import { theme } from "config/theme";
import useStore from "hooks/useStore";
import cookie from "js-cookie";

export default function SideBarMenu() {
  const router = useRouter();
  const { signOut } = useStore();

  const solutionsData = [
    {
      icon: "scouting",
      title: "Scouting",
      path: "/scout",
      active: router.asPath.includes("scout"),
      passiveIcon: false
    },
    {
      icon: "sourcing",
      title: "Sourcing",
      path: "/source",
      active: router.asPath.includes("source"),
      passiveIcon: false
    },
    {
      icon: "evaluate",
      title: "Evaluate",
      path: "/evaluate",
      active: router.asPath.includes("evaluate"),
      passiveIcon: false
    },
    {
      icon: "sustainability",
      title: "Sustainability",
      path: "/sustainability",
      active: router.asPath.includes("sustainability"),
      passiveIcon: false,
      extra: "leaf",
    },
    {
      icon: "finance",
      title: "Finance",
      path: "/finance",
      active: router.asPath.includes("finance"),
      passiveIcon: true
    },
    {
      icon: "transport",
      title: "Transport",
      path: "/transport",
      active: router.asPath.includes("transport"),
      passiveIcon: true
    },
    {
      icon: "total-solution",
      title: "Total Solution",
      path: "/total-solution",
      active: router.asPath.includes("total-solution"),
      passiveIcon: false
    },
  ];

  const marketData = [
    {
      icon: "raw-material",
      title: "Raw Material",
      path: "/raw-material",
      active: router.asPath.includes("raw-material"),
      passiveIcon: false
    },
    {
      icon: "supplier-news",
      title: "Supplier News",
      path: "/supplier-news",
      active: router.asPath.includes("supplier-news"),
      passiveIcon: false
    },
    {
      icon: "market-insights",
      title: "Market Insights",
      path: "/market-insights",
      active: router.asPath.includes("market-insights"),
      passiveIcon: false
    },
    {
      icon: "exhibition-center",
      title: "Exhibition Center",
      path: "/exhibition-center",
      active: router.asPath.includes("exhibition-center"),
      passiveIcon: true
    },
  ];

  const logout = () => {
    signOut();
    cookie.remove("token");
    router.push("/login");
  };

  return (
    <Container>
      {/* {!open ? (
        <IconContainer>
          <TopSection>
            <Section>
              <Logo src="/menu/mini-logo.svg" />
            </Section>
            <Section>
              {solutionsData.map((item: any, index: any) => {
                return (
                  <Link key={index} href={item.active ? `${item?.path}` : "#"}>
                    <IconWrapper active={item.active}>
                      <Icon src={`/menu/${item.icon}.svg`} />
                    </IconWrapper>
                  </Link>
                );
              })}
            </Section>
            <Section>
              {marketData.map((item: any, index: any) => {
                return (
                  <Link key={index} href={item.active ? `${item?.path}` : "#"}>
                    <IconWrapper active={item.active}>
                      <Icon src={`/menu/${item.icon}.svg`} />
                    </IconWrapper>
                  </Link>
                );
              })}
            </Section>
          </TopSection>
          <Section>
            <Logo src="/menu/bmw.svg" />
          </Section>
        </IconContainer>
      ) : ( */}
      <MenuContainer>
        <TopSection>
          <Section>
            <Logo src="/menu/logo.svg" />
          </Section>
          <Section>
            <UserContainer>
              <Welcome>Welcome</Welcome>
              <UserName>Baran!</UserName>
              <Avatar>BG</Avatar>
            </UserContainer>
            <MenuTitle>SOLUTIONS</MenuTitle>
            {solutionsData.map((item: any, index: any) => {
              return (
                <Link key={index} href={item.passiveIcon ? '#' : `${item?.path}`}>
                  <MenuWrapper active={item.active} passiveIcon={item.passiveIcon}>
                    <MenuIcon src={`/menu/${item.icon}.svg`} active={item.active} passiveIcon={item.passiveIcon} />
                    <MenuItemTitle active={item.active} passiveIcon={item.passiveIcon}>{item.title}</MenuItemTitle>
                    {item.extra && (
                      <ExtraIcon src={`/menu/${item.extra}.svg`} />
                    )}
                  </MenuWrapper>
                </Link>
              );
            })}
          </Section>
          <Section>
            <MenuTitle>MARKET DATA</MenuTitle>
            {marketData.map((item: any, index: any) => {
              return (
                <Link key={index} href={item.passiveIcon ? '#' : `${item?.path}`}>
                  <MenuWrapper active={item.active} passiveIcon={item.passiveIcon}>
                    <MenuIcon src={`/menu/${item.icon}.svg`} active={item.active} passiveIcon={item.passiveIcon} />
                    <MenuItemTitle active={item.active} passiveIcon={item.passiveIcon}>{item.title}</MenuItemTitle>
                  </MenuWrapper>
                </Link>
              );
            })}
          </Section>
        </TopSection>
        <Section>
          <AccountContainer>
            <Left>
              <Logo src="/menu/bmw.svg" />
            </Left>
            <Right>
              <AccountTitle>BMW</AccountTitle>
              <TextContainer>
                <AccountType>Premium Account |</AccountType>
                <Logout onClick={logout}>Log out</Logout>
              </TextContainer>
            </Right>
          </AccountContainer>
        </Section>
      </MenuContainer>
      {/* )} */}
      {/* <ArrowWrapper onClick={() => setOpen(!open)}>
        <ArrowIcon src={`/menu/${open ? "left" : "right"}-arrow.svg`} />
      </ArrowWrapper> */}
    </Container>
  );
}

const animation = keyframes`
  0% { transform: translateX(-60%) }
  100% { transform: translateX(0) }
`;

const Container = styled.div<any>`
  font-family: Nunito;
  min-height: 100vh;
  width: ${theme.dimension.leftMenuWidth};
  position: fixed;
  box-sizing: border-box;
  z-index: 1000;
  /* transition: 1s all 0s; */
`;

const IconContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 34px 0;
`;

const MenuContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: fixed;
  transition: 0.9s ease;
  padding: 34px 24px;
  /* animation-name: ${animation}; */
  animation-duration: 0.9s;
  @media (max-height: 820px) {
    position: unset;
  }
`;

const TopSection = styled.div`
  min-height: 700px;
  display: flex;
  flex-direction: column;
  gap: 46px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  /* margin: 34px 0px; */
`;

const IconWrapper = styled.div<any>`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  &:hover {
    background: rgb(8, 151, 156, 0.1);
    transition: background 0.3s ease;
  }
`;

const Icon = styled.img`
  padding: 10px 12px;
  &:hover {
    filter: invert(37%) sepia(57%) saturate(5004%) hue-rotate(161deg)
      brightness(99%) contrast(94%);
  }
`;

const ArrowWrapper = styled.div`
  width: 27px;
  height: 27px;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 90px;
  right: -13px;
  cursor: pointer;
  transition: 0.9s ease;
`;

const ArrowIcon = styled.img``;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 24px;
`;

const Welcome = styled.span`
  color: #808080;
`;
const UserName = styled.span`
  color: #1a1a1a;
`;
const Avatar = styled.span`
  color: #ffffff;
  border-radius: 100%;
  background: #6adac2;
  width: 30px;
  height: 28px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1a1a1a;
  margin-bottom: 5px;
`;

const MenuIcon = styled.img<any>`
filter: ${(props) => (props.active && "invert(37%) sepia(57%) saturate(5004%) hue-rotate(161deg) brightness(99%) contrast(94%)")};
`;
const ExtraIcon = styled.img``;

const MenuItemTitle = styled.span<any>`
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: ${(props) => (props.passiveIcon ? "#B3B3B3" : props.active ? "#08979C" : "#1a1a1a")};
  margin: 0 3px 0 15px;
`;

const MenuWrapper = styled.div<any>`
  display: flex;
  border-radius: 8px;
  background-color: ${(props) => (props.active && "rgb(8, 151, 156, 0.1)")};
  cursor: ${(props) => (props.passiveIcon ? "not-allowed" : "pointer")};
  padding: 10px;
  &:hover {
    background: ${(props) => (!props.passiveIcon && "rgb(8, 151, 156, 0.1)")};
    ${MenuItemTitle} {
      color: ${props => !props.passiveIcon && "#08979C"}
    }
    ${MenuIcon} {
      filter: ${props => !props.passiveIcon && "invert(37%) sepia(57%) saturate(5004%) hue-rotate(161deg) brightness(99%) contrast(94%)"}
    }
  }
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 27px;
`;

const Left = styled.span`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const Right = styled.span`
  display: flex;
  flex-direction: column;
`;

const AccountTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1a1a1a;
`;

const TextContainer = styled.div`
  display: flex;
`

const AccountType = styled.span`
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #2c71f0;
`;

const Logout = styled.span`
   font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #2c71f0;
  margin-left: 3px;
  cursor: pointer;
`