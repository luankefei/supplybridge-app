import styled from "styled-components";
import { useRouter } from "next/router";

import { Icon } from "./Icon";

export const Header = () => {
  const { pathname } = useRouter();

  const mainHeaderItems = [
    { title: "AUTOMOTIVE", path: "automotive" },
    { title: "AEROSPACE", path: "aerospace" },
    { title: "RAILWAY", path: "railway" },
    { title: "OTHER", path: "other" },
  ];

  const chooseMenuItems = () => {
    // STILL WIP
    const splitPathname = pathname.split("/");
    if (splitPathname.length > 2) {
      return mainHeaderItems;
    } else {
      return [];
    }
  };

  const findActiveItem = (path: string) => {
    if (pathname.includes(path)) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <Icon src="logo" width={243} height={30} />
      <Menus>
        {chooseMenuItems().map((item, index) => (
          <MenuItem key={index} active={findActiveItem(item.path)}>
            {item.title}
          </MenuItem>
        ))}
      </Menus>
      <ProfileContainer>
        <Label>Company Name</Label>
        <DropdownItem>USER NAME</DropdownItem>
      </ProfileContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.04);
  height: 96px;
  padding: 0px 50px;
`;

const Menus = styled.div`
  display: inline-flex;
  gap: 12px;
  align-self: stretch;
  align-items: center;
`;

const MenuItem = styled.span<{ active?: boolean }>`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  padding: 0px 12px;
  cursor: pointer;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  display: flex;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${props.theme.colors.primary}` : 0};
  color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.text};
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text};
`;

const DropdownItem = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.primary};
`;
