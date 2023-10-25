import { KeyboardArrowUp, Replay } from "@mui/icons-material";
import { Box, IconButton, Zoom, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IProps {
  counts: [string, number][];
  onClick?: (key: string) => void;
  onBack?: () => void;
}
export const Legend = ({ counts, onClick, onBack }: IProps) => {
  const { t } = useTranslation();
  const subCounts = counts.slice(0, -1);
  const totalCount = counts[counts.length - 1];

  return (
    <LegendContainer>
      <LegendHeader>
        <Box
          alignItems={"center"}
          sx={{ display: "flex", justifyContent: "space-between" }}
          p={1}
        >
          {t("scout.map.legend.totalResults", "Total Results")}
          {onBack && (
            <IconButton size="small" onClick={onBack}>
              <KeyboardArrowUp sx={{ fontSize: "16px" }} />
            </IconButton>
          )}
        </Box>
      </LegendHeader>
      <LegendBody>
        {subCounts.map((c, idx) => (
          <LegendItemGapContainer
            key={idx}
            onClick={() => onClick?.call(null, c[0])}
          >
            <LegendItemKey>{c[0]}</LegendItemKey>
            <LegendItemVal>{c[1] || 0}</LegendItemVal>
          </LegendItemGapContainer>
        ))}
      </LegendBody>
      <LegendFooter>
        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
          p={"0 8px"}
        >
          <span>{totalCount[0]}</span>
          <span>{totalCount[1]}</span>
        </Box>
      </LegendFooter>
    </LegendContainer>
  );
};

const LegendContainer = styled("div")`
  position: relative;
  width: 218px;
  height: 250px;
  background-color: trasparent;
`;

const LegendHeader = styled("div")`
  position: sticky;
  top: 0;
  height: 25px;
`;
const LegendBody = styled("div")`
  overflow-y: auto;
  height: 180px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const LegendFooter = styled("div")`
  position: sticky;
  bottom: 0;
  height: 25px;
`;

const LegendItemContainer = styled("div")<{
  onClick?: () => void;
}>`
  display: flex;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};

  :hover {
    background-color: ${(props) => (props.onClick ? "#fff" : "transparent")};
  }
`;

const LegendItemGapContainer = styled(LegendItemContainer)`
  background-color: #f3f3f3;
  margin-top: 3px;
`;

const LegendItemKey = styled("div")`
  width: 60%;
`;
const LegendItemVal = styled("div")`
  width: 40%;
  text-align: right;
`;
