import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { usePersistentStore } from "hooks/useStore";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/material";
import { SpacingVertical } from "./ui-components/spacer";

interface IRenderMenuItem {
  icon: string;
  title: string;
  path: string;
  active: boolean;
  passiveIcon: boolean;
  extra?: string;
}

export default function SideBarMenu() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = usePersistentStore();
  const solutionsData: IRenderMenuItem[] = [
    {
      icon: "scouting",
      title: t("sidebar.scouting", "Scouting"),
      path: "/scout",
      active: router.asPath.includes("scout"),
      passiveIcon: false,
    },
    {
      icon: "sourcing",
      title: t("sidebar.sourcing", "Sourcing"),
      path: "/source",
      active: router.asPath.includes("source"),
      passiveIcon: false,
    },
    {
      icon: "evaluate",
      title: t("sidebar.evaluate", "Evaluate"),
      path: "/evaluate",
      active: router.asPath.includes("evaluate"),
      passiveIcon: true,
    },
    {
      icon: "sustainability",
      title: t("sidebar.sustainability", "Sustainability"),
      path: "/sustainability",
      active: router.asPath.includes("sustainability"),
      passiveIcon: true,
      extra: "leaf",
    },
    /* REL202306*/
    {
      icon: "finance",
      title: t("sidebar.finance", "Finance"),
      path: "/finance",
      active: router.asPath.includes("finance"),
      passiveIcon: true,
    },
    {
      icon: "transport",
      title: t("sidebar.transport", "Transport"),
      path: "/transport",
      active: router.asPath.includes("transport"),
      passiveIcon: true,
    },
    {
      icon: "total-solution",
      title: t("sidebar.totalSolution", "Total Solution"),
      path: "/total-solution",
      active: router.asPath.includes("total-solution"),
      passiveIcon: false,
    },
  ];

  const marketData: IRenderMenuItem[] = [
    {
      icon: "raw-material",
      title: t("sidebar.rawMaterials", "Raw Material"),
      path: "/raw-material",
      active: router.asPath.includes("raw-material"),
      passiveIcon: false,
    },
    {
      icon: "supplier-news",
      title: t("sidebar.newsAndInsights", "News & Insights"),
      path: "/supplier-news",
      active: router.asPath.includes("supplier-news"),
      passiveIcon: false,
    },
    {
      icon: "supply-chain-transparency",
      title: t("sidebar.supplyChainTransparency", "Supply Chain Transparency"),
      path: "/supply-chain-transparency",
      active: router.asPath.includes("supply-chain-transparency"),
      passiveIcon: false,
    },
    /*
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
*/
  ];
  const stickyMenu: IRenderMenuItem[] = [
    {
      icon: "bell",
      title: t("sidebar.notifications", "Notifications"),
      path: "/notification",
      active: router.asPath.includes("notification"),
      passiveIcon: false,
    },
    {
      icon: "profile",
      title: user?.name || "",
      path: "/account",
      active: router.asPath.includes("account"),
      passiveIcon: false,
    },
  ];

  const renderMenuItem = (data: IRenderMenuItem[]) => {
    return data.map((item: any, index: any) => (
      <Link key={index} href={item.passiveIcon ? "" : `${item?.path}`}>
        <MenuWrapper active={item.active} passiveIcon={item.passiveIcon}>
          <MenuIcon
            src={`/menu/${item.icon}.svg`}
            active={item.active}
            passiveIcon={item.passiveIcon}
          />
          <MenuItemTitle active={item.active} passiveIcon={item.passiveIcon}>
            {item.title}
          </MenuItemTitle>
          {item.extra && <ExtraIcon src={`/menu/${item.extra}.svg`} />}
          {item.passiveIcon && (
            <ComingSoon>{t("sidebar.comingSoon", "COMING SOON")}</ComingSoon>
          )}
        </MenuWrapper>
      </Link>
    ));
  };

  return (
    <Stack
      height={"100vh"}
      justifyContent={"space-between"}
      bgcolor={"white"}
      sx={{
        fontFamily: "Nunito !important",
      }}
    >
      <Stack p={"34px 24px"}>
        <picture>
          <img src="/menu/logo.svg" alt="logo" />
        </picture>
        <SpacingVertical space="48px" />
        <Box>
          <SpacingVertical space="24px" />
          <MenuTitle>{t("sidebar.solutions", "SOLUTIONS")}</MenuTitle>
          {renderMenuItem(solutionsData)}
        </Box>
        <SpacingVertical space="24px" />
        <Box>
          <MenuTitle>{t("sidebar.marketData", "MARKET DATA")}</MenuTitle>
          {renderMenuItem(marketData)}
        </Box>
      </Stack>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          p: "0 24px 24px 24px",
        }}
      >
        <Stack
          sx={{
            bgcolor: "white",
            borderTop: "1px solid #E5E5E5",
            ...dividerCss,
          }}
        >
          {renderMenuItem(stickyMenu)}
        </Stack>
      </Box>
    </Stack>
  );
}

const dividerCss = {
  "::before": {
    content: "''",
    display: "block",
    width: "8px",
    height: "8px",
    position: "absolute",
    top: "-4px",
    left: "24px",
    transform: "rotate(45deg)",
    backgroundColor: "#f0f0f0",
  },
  "::after": {
    content: "''",
    display: "block",
    width: "8px",
    height: "8px",
    position: "absolute",
    top: "-4px",
    right: "24px",
    transform: "rotate(45deg)",
    backgroundColor: "#f0f0f0",
  },
};

const MenuTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1a1a1a;
  margin-bottom: 5px;
`;

const MenuIcon = styled.img<any>`
  filter: ${(props) =>
    props.active &&
    "invert(37%) sepia(57%) saturate(5004%) hue-rotate(161deg) brightness(99%) contrast(94%)"};
`;
const ExtraIcon = styled.img``;

const MenuItemTitle = styled.span<any>`
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: ${(props) =>
    props.passiveIcon ? "#B3B3B3" : props.active ? "#08979C" : "#1a1a1a"};
  margin: 0 3px 0 15px;
  white-space: nowrap;
`;

const ComingSoon = styled("span")`
  font-family: Ubuntu;
  font-size: 12px;
  line-height: 18px;
  background-color: #fcf1e2;
  padding: 3px 5px;
  transform: scale(0.7);
  margin-left: -9px;
  border-radius: 5px;
  color: #b97f24;
  font-weight: bold;
  white-space: nowrap;
  height: 24px;
`;

const MenuWrapper = styled.div<any>`
  display: flex;
  border-radius: 8px;
  color: ${(props) => (props.active ? "#08979C" : "#1a1a1a")};
  background-color: ${(props) => props.active && "rgb(8, 151, 156, 0.1)"};
  cursor: ${(props) => (props.passiveIcon ? "not-allowed" : "pointer")};
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  &:hover {
    background: ${(props) => !props.passiveIcon && "rgb(8, 151, 156, 0.1)"};
    ${MenuItemTitle} {
      color: ${(props) => !props.passiveIcon && "#08979C"};
    }
    ${MenuIcon} {
      filter: ${(props) =>
        !props.passiveIcon &&
        "invert(37%) sepia(57%) saturate(5004%) hue-rotate(161deg) brightness(99%) contrast(94%)"};
    }
  }
  & > img {
    opacity: ${(props) => (!props.passiveIcon ? 1 : 0.4)};
  }
`;
