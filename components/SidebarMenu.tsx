import Link from "next/link";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

export default function SideBarMenu() {
  const [open, setOpen] = useState(false)

  const solutionsData = [
    {
      icon: "scouting",
      title: "Scouting",
      path: "/scout",
      active: true
    },
    {
      icon: "sourcing",
      title: "Sourcing",
      path: "/source",
      active: true
    },
    {
      icon: "evaluate",
      title: "Evaluate",
      path: "/evaluate",
      active: true
    },
    {
      icon: "sustainability",
      title: "Sustainability",
      path: "/sustainability",
      active: true,
      extra: "leaf"
    },
    {
      icon: "finance",
      title: "Finance",
      path: "/finance",
      active: false
    },
    {
      icon: "transport",
      title: "Transport",
      path: "/transport",
      active: false
    },
    {
      icon: "total-solution",
      title: "Total Solution",
      path: "/total-solution",
      active: true
    },
  ]

  const marketData = [
    {
      icon: "raw-material",
      title: "Raw Material",
      path: "/raw-material",
      active: true
    },
    {
      icon: "supplier-news",
      title: "Supplier News",
      path: "/supplier-news",
      active: true
    },
    {
      icon: "market-insights",
      title: "Market Insights",
      path: "/market-insights",
      active: true
    },
    {
      icon: "exhibition-center",
      title: "Exhibition Center",
      path: "/exhibition-center",
      active: false
    },
  ]

  return (
    <Container width={open}>
      {!open ?
        <IconContainer>
          <TopSection>
            <Section>
              <Logo src="/menu/mini-logo.svg" />
            </Section>
            <Section>
              {solutionsData.map((item: any, index: any) => {
                return (
                  <Link key={index} href={item.active ? `/${item?.path}` : '#'}>
                    <IconWrapper active={item.active}>
                      <Icon src={`/menu/${item.icon}.svg`} />
                    </IconWrapper>
                  </Link>
                )
              })}
            </Section>
            <Section>
              {marketData.map((item: any, index: any) => {
                return (
                  <Link key={index} href={item.active ? `/${item?.path}` : '#'}>
                    <IconWrapper active={item.active}>
                      <Icon src={`/menu/${item.icon}.svg`} />
                    </IconWrapper>
                  </Link>
                )
              })}
            </Section>
          </TopSection>
          <Section>
            <Logo src="/menu/bmw.svg" />
          </Section>
        </IconContainer>
        :
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
              <MenuTitle>
                SOLUTIONS
              </MenuTitle>
              {solutionsData.map((item: any, index: any) => {
                return (
                  <Link key={index} href={item.active ? `/${item?.path}` : '#'}>
                    <MenuWrapper active={item.active}>
                      <MenuIcon src={`/menu/${item.icon}.svg`} />
                      <MenuItemTitle>
                        {item.title}
                      </MenuItemTitle>
                      {item.extra && <MenuIcon src={`/menu/${item.extra}.svg`} />}
                    </MenuWrapper>
                  </Link>
                )
              })}
            </Section>
            <Section>
              <MenuTitle>
                MARKET DATA
              </MenuTitle>
              {marketData.map((item: any, index: any) => {
                return (
                  <Link key={index} href={item.active ? `/${item?.path}` : '#'}>
                    <MenuWrapper active={item.active}>
                      <MenuIcon src={`/menu/${item.icon}.svg`} />
                      <MenuItemTitle>
                        {item.title}
                      </MenuItemTitle>
                    </MenuWrapper>
                  </Link>
                )
              })}
            </Section>
          </TopSection>
          <Section>
            <AccountContainer>
              <Left>
                <Logo src="/menu/bmw.svg" />
              </Left>
              <Right>
                <AccountTitle>
                  BMW
                </AccountTitle>
                <AccountType>
                  Premium Account
                </AccountType>
              </Right>
            </AccountContainer>
          </Section>
        </MenuContainer>
      }
      <ArrowWrapper onClick={() => setOpen(!open)}>
        <ArrowIcon src={`/menu/${open ? "left" : "right"}-arrow.svg`} />
      </ArrowWrapper>

    </Container>
  )
}

const animation = keyframes`
  0% { transform: translateX(-60%) }
  100% { transform: translateX(0) }
`;

const Container = styled.div<any>`
  height: 100vh;
  min-height: 100%;
  width: ${(props) => (props.width ? "280px" : "62px")};
  transition: ${(props) => (!props.width && ".5s ease")};
  position: relative;
  box-sizing: border-box;
  position: fixed;
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
  justify-content: space-between;
  background-color: #ffffff;
  transition: .9s ease;
  padding: 34px 24px;
  animation-name: ${animation};
  animation-duration: .9s;
`;

const TopSection = styled.div`
min-height: 800px;
display: flex;
flex-direction: column;
justify-content: space-between;
animation: linear;
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
    transition: background .3s ease;
  }
`;

const Icon = styled.img`
  padding: 10px 12px;
  &:hover {
    filter: invert(37%) sepia(57%) saturate(5004%) hue-rotate(161deg) brightness(99%) contrast(94%);
  }
`;

const ArrowWrapper = styled.div`
  width: 27px;
  height: 27px;
  background: #FFFFFF;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 90px;
  right: -13px;
  cursor: pointer;
  transition: .9s ease;
  animation-name: ${animation};
  animation-duration: .9s;
`;

const ArrowIcon = styled.img`

`;

// when the menu is open

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const Welcome = styled.span`
  color: #808080;
`;
const UserName = styled.span`
  color: #1A1A1A;
`;
const Avatar = styled.span`
  color: #ffffff;
  border-radius: 100%;
  background: #6ADAC2;
  padding: 6px;
`;

const MenuTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1A1A1A;
  margin: 15px 0 5px 0;
`;

const MenuWrapper = styled.div<any>`
  display: flex;
  /* margin: 20px 0 20px 10px; */
  border-radius: 8px;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  padding: 10px;
  &:hover {
    background: rgb(26, 26, 26, 0.1);
    transition: background .3s ease;
    filter: invert(37%) sepia(57%) saturate(5004%) hue-rotate(161deg) brightness(99%) contrast(94%);
  }
`;

const MenuIcon = styled.img`

`;

const MenuItemTitle = styled.span`
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #1A1A1A;
  margin: 0 3px 0 15px;
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
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
  color: #1A1A1A;
`;

const AccountType = styled.span`
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #2C71F0;
`;