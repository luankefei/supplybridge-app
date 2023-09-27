import { Zoom, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IProps {
  counts: [string, number][];
  onClick?: (key: string) => void;
}
export const Legend = ({ counts, onClick }: IProps) => {
  const { t } = useTranslation();
  return (
    <LegendContainer>
      {t("scout.map.legend.totalResults", "Total Results")}
      {counts.map((c, idx) => (
        <LegendItemGapContainer
          key={idx}
          onClick={() => onClick?.call(null, c[0])}
        >
          <LegendItemKey>{c[0]}</LegendItemKey>
          <LegendItemVal>{c[1] || 0}</LegendItemVal>
        </LegendItemGapContainer>
      ))}
    </LegendContainer>
  );
};

const LegendContainer = styled("div")<any>`
  width: 218px;
  height: 250px;
  background-color: trasparent;
`;

const LegendItemContainer = styled("div")<{
  onClick?: () => void;
}>`
  display: flex;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
`;

const LegendItemGapContainer = styled(LegendItemContainer)`
  background-color: #f3f3f3;
  margin-top: 3px;
`;
const LegendItemGapAContainer = styled(LegendItemContainer)`
  background-color: #f3f3f3;
  margin-top: 3px;
  border-radius: 8px 8px 0 0;
`;
const LegendItemBContainer = styled(LegendItemContainer)`
  background-color: white;
  border-radius: 0 0 8px 8px;
  border-top: none;
`;

const LegendItemKey = styled("div")`
  width: 60%;
`;
const LegendItemVal = styled("div")`
  width: 40%;
  text-align: right;
`;
