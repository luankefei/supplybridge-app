import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import cookie from "js-cookie";

import { usePersistentStore } from "hooks/useStore";

import Icon from "components/icon";

const Header = () => {
  const { pathname, push } = useRouter();
  const { signOut } = usePersistentStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    signOut();
    cookie.remove("token");
    push("/");
  };

  const mainHeaderItems = [
    { title: "AUTOMOTIVE", path: "automotive", parentPath: "", lock: false },
    { title: "AEROSPACE", path: "aerospace", parentPath: "", lock: true },
    { title: "RAILWAY", path: "railway", parentPath: "", lock: true },
    { title: "OTHER", path: "other", parentPath: "", lock: true },
  ];

  const automotiveHeaderItems = [
    { title: "SCOUT", path: "scout", parentPath: "automotive/", lock: false },
    { title: "SOURCE", path: "source", parentPath: "automotive/", lock: false },
    {
      title: "EVALUATE",
      path: "evaluate",
      parentPath: "automotive/",
      lock: true,
    },
    { title: "TRACE", path: "trace", parentPath: "automotive/", lock: true },
    {
      title: "FINANCE",
      path: "finance",
      parentPath: "automotive/",
      lock: true,
    },
    {
      title: "TRANSPORT",
      path: "transport",
      parentPath: "automotive/",
      lock: true,
    },
  ];

  const chooseMenuItems = () => {
    // STILL WIP
    const splitPathname = pathname.split("/");
    if (splitPathname.length === 3) {
      return mainHeaderItems;
    } else if (splitPathname.length === 4) {
      if (splitPathname.includes("automotive")) {
        return automotiveHeaderItems;
      }
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
      <Link href={"/dashboard"} passHref>
        <Icon src="logo" width={243} height={30} hover />
      </Link>
      <Menus>
        {chooseMenuItems()?.map((item, index) => (
          <MenuUnit
            key={index}
            active={findActiveItem(item.path)}
            order={index}
            onClick={() => {
              !item.lock
                ? push(`/dashboard/${item.parentPath}${item.path}`)
                : push("");
            }}
          >
            {item.title}
            {item.lock && <LockIcon src="/icons/lock.svg" />}
          </MenuUnit>
        ))}
      </Menus>
      <ProfileContainer>
        <Label>Company Name</Label>
        <DropdownItem
          onClick={handleClick}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          USER NAME <Icon src={"chevron-down"} hover />
        </DropdownItem>
      </ProfileContainer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
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

const MenuUnit = styled.span<{ active?: boolean; order: any }>`
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
  position: relative;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${props.theme.colors.secondary}` : 0};
  color: ${(props) =>
    props.active ? props.theme.colors.secondary : props.theme.colors.text};
`;

const LockIcon = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 10px;
  filter: opacity(0.5) drop-shadow(0 0 0 blue);
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
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.colors.secondary};
`;

export default Header;
