import { Box } from "@mui/material";

export enum BadgeType {
  top = "top",
  major = "major",
  risingStar = "risingStar",
}

export function mapBadgeTypeToString(badge: BadgeType) {
  switch (badge) {
    case BadgeType.top:
      return "Top";
    case BadgeType.major:
      return "Major";
    case BadgeType.risingStar:
      return "Rising Star";
    default:
      return "";
  }
}

const getBadgeColors = (badge: BadgeType) => {
  switch (badge) {
    case BadgeType.top:
      return {
        backgroundColor: "#fae3de",
        color: "#551c18",
      };
    case BadgeType.major:
      return {
        backgroundColor: "#deecdc",
        color: "#23372a",
      };
    case BadgeType.risingStar:
      return {
        backgroundColor: "#d6e4ee",
        color: "#1f3245",
      };
    default:
      return {};
  }
};

export const SupBadge = ({ badge }: { badge: BadgeType }) => {
  const { backgroundColor, color } = getBadgeColors(badge);
  return (
    <Box
      sx={{
        display: "inline-block",
        borderRadius: "4px",
        padding: "2px 5px",
        backgroundColor,
        color,
      }}
    >
      {mapBadgeTypeToString(badge)}
    </Box>
  );
};
