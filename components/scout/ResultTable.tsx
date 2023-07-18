import * as React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import Icon from "components/Icon";
import useStore from "hooks/useStore";
import { NullableImg } from "components/scout/Summary.styled";
import Tooltip from "../Tooltip";

const regionMap: any = {
  "1": "APAC",
  "2": "AMERICAS",
  "3": "EMEA",
};

const supBadgeTooltipText = (
  <div>
    <div>
      <h3>Top</h3>
    </div>
    <p>
      A few lead performingSuppliers in the particular category / sub-category
      -usually by Sales Marketshare.
    </p>
    <div>
      <h3>MAJOR</h3>
    </div>
    <p>
      Key Suppliers in the particular category / sub-category - can be by a
      combination of criteria.
    </p>
    <div>
      <h3>RISING STAR</h3>
    </div>
    <p>
      High potential suppliers with promising new technology, business model.or
      other forms of innovations.
    </p>
  </div>
);

const TableCell = styled("td")`
  padding: 15px 10px;
`;
const TableHead = styled("thead")``;
const TableBody = styled("tbody")``;
const TableRow = styled("tr")``;

const Result = styled("div")`
  display: flex;
  width: 100%;
`;
const ResultSelectedContainer = styled("div")`
  margin-top: 30px;
  display: flex;
  width: 100%;
`;

const ResultTable = styled("table")`
  width: 100%;
  overflow-wrap: break-word;
  overflow-x: auto;
  border-spacing: 0;
`;

const ResultTableContainer = styled("div")`
  & {
    background-color: transparent;
  }
  width: 100%;
  margin: 0 20px;

  .blur {
    filter: blur(3px);
    user-select: none;
  }
  .blur-lock:after {
    background: url(/icons/lock.svg);
    background-size: contain;
    background-repeat: no-repeat;
    width: 22px;
    height: 22px;
    position: absolute;
    content: "";
    left: calc(100% + 12px);
    top: 12px;
  }
`;

const ResultTitleCell = styled("div")`
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: white;
  margin-right: 5px;
  max-width: 500px;
`;

const ResultTableCellWithImg = styled(TableCell)`
  > div > span,
  > div > img {
    display: inline-block;
    height: 24px;
    margin-right: 3px;
  }
  > div {
    line-height: 22px;
    display: flex;
  }
`;

const SupBadge = styled("span")`
  display: inline-block;
  padding: 2px 5px;
  &.top {
    background-color: #fae3de;
    color: #551c18;
  }
  &.maj {
    background-color: #deecdc;
    color: #23372a;
  }
  &.str {
    background-color: #d6e4ee;
    color: #1f3245;
  }
`;

const ResultTableHeadRow = styled(TableRow)`
  & > :nth-child(2) {
    left: 0;
    position: sticky;
    background-color: #edf1f3;
  }
`;

const ResultTableRow = styled(TableRow)`
  background-color: white;
  border-radius: 10px;
  & > :first-child {
    border-radius: 10px 0 0 10px;
    box-shadow: 0px -3px 2px -3px rgba(0, 0, 0, 0.2) inset;
  }
  & > :last-child {
    border-radius: 0 10px 10px 0;
    box-shadow: -2px -3px 2px -3px rgba(0, 0, 0, 0.2) inset;
  }
  & > :nth-child(2) {
    left: 0;
    position: sticky;
  }
  > td {
    border-radius: 0;
    border-bottom: 5px solid #edf1f3;
    box-shadow: 0px -3px 0px -2px rgba(0, 0, 0, 0.1) inset;
  }
`;

const ResultTableRowBlur = styled(TableRow)`
  border-radius: 10px;
  background-color: white;
  filter: blur(3px);
  user-select: none;
  > td {
    text-align: center;
    border-radius: 0;
    border-bottom: 5px solid #edf1f3;
    height: 59px;
    padding: 10px;
  }
`;

const ResultHeadCell = styled(TableCell)`
  background-color: transparancy;
  color: #757575;
`;

const IdCell = styled(TableCell)`
  max-width: 50px;
`;

const CompetenceCell = styled(TableCell)`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BadgeContainer = styled("span")`
  background-color: ${(props) => props.color || "#08979C"};
  color: white;
  display: inline-block;
  border-radius: 50%;
  padding: 3px 4px 0 4px;
  margin-right: 3px;
  margin-top: -3px;
`;

const BadgeListContainer = styled("div")`
  white-space: nowrap;
`;

const Badge = (props: any) => (
  <Icon src={props?.icon} width={20} height={20} hover tooltip={props?.label} />
);

const BadgeList = (props: any) => {
  const { data } = props;
  return (
    <BadgeListContainer>
      {/*<BadgeContainer><Badge icon={"verified"} label={"Verified Supplier"} /></BadgeContainer>*/}
      {data.isInnovation ? (
        <BadgeContainer color={"#eb2f96"}>
          <Badge icon={"innovation"} label={"innovation"} />
        </BadgeContainer>
      ) : null}
    </BadgeListContainer>
  );
};

const NextButton = styled("button")`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  color: #08979c;
  width: 28px;
  height: 28px;

  &:hover {
    opacity: 0.5;
  }
  &.inactive {
    pointer-events: none;
    opacity: 0.3;
  }
`;

export default function BasicTable() {
  const { t } = useTranslation();
  const { allSubRegions, suppliers, flags, setFilterData } = useStore();
  const isSearchForCompanies = flags.type === "Companies" && !flags.selected;
  const data = suppliers?.map((x: any) => ({
    logo: x.logo || `https://cdn-stage.supplybridge.com/images/logos/no.png`,
    name: x.name && x.name.toUpperCase(),
    longName: x.longName,
    headquarter: x.headquarterId
      ? allSubRegions.find((z: any) => z.id === x.headquarterId)
      : null,
    isInnovation: x.isInnovation,
    isBlur: !x.headquarterId,
    category: x?.category || [],
    flags: x?.flags || {},
  }));
  data &&
    data.forEach((z: any) => {
      z.meta = {
        hqlocation: z.headquarter
          ? (z.headquarter.code || z.headquarter.name).toLowerCase()
          : "",
      };
    });
  const onResultClick = (row: any) => {
    const q = row.category?.[0];
    if (!q) return;
    flags.selected = row;
    flags.back = flags.q;
    setFilterData({ q: q.split(",")[0] });
  };
  return !data?.length ? null : (
    <Result>
      <ResultTableContainer>
        <ResultTable aria-label="simple table">
          <TableHead>
            <ResultTableHeadRow>
              <ResultHeadCell sx={{ width: "50px" }}>&nbsp;</ResultHeadCell>
              <ResultHeadCell>
                {t("scout.result.organization", "Organization")}
              </ResultHeadCell>
              <ResultHeadCell>
                {t("scout.result.hqLocation", "HQ Location")}
              </ResultHeadCell>
              <ResultHeadCell>
                {t("scout.result.footprint", "Global Footprint")}
              </ResultHeadCell>
              <ResultHeadCell>
                {t("scout.result.badge", "Badge")}{" "}
                <Tooltip top={-18} left={70} text={supBadgeTooltipText} />
              </ResultHeadCell>
              {/*<ResultHeadCell>Category</ResultHeadCell>*/}
              {isSearchForCompanies ? (
                <ResultHeadCell>
                  {t("showSimilar", "Show Similar")}
                </ResultHeadCell>
              ) : null}
            </ResultTableHeadRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, i: number) =>
              i >= 10 ? (
                <ResultTableRowBlur key={i}>
                  <td colSpan={5}>hidden</td>
                </ResultTableRowBlur>
              ) : (
                <ResultTableRow key={i}>
                  <IdCell>{i + 1}</IdCell>
                  <ResultTableCellWithImg
                    sx={{ "min-width": "30%", "padding-right": "30px" }}
                    className={row.isBlur ? "blur-lock" : ""}
                  >
                    <div>
                      <NullableImg url={row.logo} />
                      <ResultTitleCell>
                        <a title={row.name || row.longName}>
                          {row.name || row.longName}
                        </a>
                      </ResultTitleCell>
                      <BadgeList data={row} />
                    </div>
                  </ResultTableCellWithImg>
                  <ResultTableCellWithImg className={row.isBlur ? "blur" : ""}>
                    <div>
                      <NullableImg
                        url={
                          row.headquarter?.code
                            ? `/flags/${row.headquarter?.code?.toLowerCase()}.svg`
                            : ""
                        }
                      />
                      <div>
                        {t(
                          `subregion.${row.meta.hqlocation}`,
                          `hidden.${row.meta.hqlocation}`
                        )}
                      </div>
                    </div>
                  </ResultTableCellWithImg>
                  <TableCell className={row.isBlur ? "blur" : ""}>
                    {t(
                      `region.${regionMap[row.headquarter?.regionId]}`,
                      `hidden.${regionMap[row.headquarter?.regionId]}.${
                        row.headquarter?.regionId
                      }`
                    )}
                  </TableCell>
                  <TableCell className={row.isBlur ? "blur" : ""}>
                    {row?.flags.maj ? (
                      <SupBadge className={"maj"}>MAJOR</SupBadge>
                    ) : null}
                    {row?.flags.top ? (
                      <SupBadge className={"top"}>TOP</SupBadge>
                    ) : null}
                    {row?.flags.str ? (
                      <SupBadge className={"str"}>RISING STAR</SupBadge>
                    ) : null}
                  </TableCell>
                  {/*<CompetenceCell className={row.isBlur ? "blur" : ""}>
                  <a
                    title={
                      row.isBlur
                        ? ""
                        : row.supplierCategory || row.coreCompetence
                    }
                  >
                    {row.supplierCategory || row.coreCompetence}
                  </a>
                </CompetenceCell>*/}
                  {isSearchForCompanies ? (
                    <TableCell>
                      <NextButton
                        className={!!row.category?.length ? "" : "inactive"}
                        onClick={() => onResultClick(row)}
                        title={t("showSimilar", "Show Similar")}
                      >
                        &gt;
                      </NextButton>
                    </TableCell>
                  ) : null}
                </ResultTableRow>
              )
            )}
          </TableBody>
        </ResultTable>
      </ResultTableContainer>
    </Result>
  );
}

export const ResultSelected = (props: any) => {
  const { t } = useTranslation();
  const row: any = props?.selected;
  const isBlur = !row.headquarter?.name;
  return (
    <ResultSelectedContainer>
      <ResultTableContainer>
        <ResultTable aria-label="simple table">
          <TableBody>
            <ResultTableRow>
              <IdCell>&nbsp;</IdCell>
              <ResultTableCellWithImg
                sx={{ "min-width": "30%", "padding-right": "30px" }}
                className={row.isBlur ? "blur-lock" : ""}
              >
                <div>
                  <NullableImg url={row.logo} />
                  <ResultTitleCell>
                    <a title={row.name || row.longName}>
                      {row.name || row.longName}
                    </a>
                  </ResultTitleCell>
                  <BadgeList data={row} />
                </div>
              </ResultTableCellWithImg>
              <ResultTableCellWithImg className={row.isBlur ? "blur" : ""}>
                <div>
                  <NullableImg
                    url={
                      row.headquarter?.code
                        ? `/flags/${row.headquarter?.code?.toLowerCase()}.svg`
                        : ""
                    }
                  />
                  <div>{t(`subregion.${row.meta.hqlocation}`, "hidden")}</div>
                </div>
              </ResultTableCellWithImg>
              <TableCell className={row.isBlur ? "blur" : ""}>
                {t(`region.${regionMap[row.headquarter?.regionId]}`, "hidden")}
              </TableCell>
              <TableCell className={row.isBlur ? "blur" : ""}>
                {row?.flags.maj ? (
                  <SupBadge className={"maj"}>MAJOR</SupBadge>
                ) : null}
                {row?.flags.top ? (
                  <SupBadge className={"top"}>TOP</SupBadge>
                ) : null}
                {row?.flags.str ? (
                  <SupBadge className={"str"}>RISING STAR</SupBadge>
                ) : null}
              </TableCell>
              {/*
              <CompetenceCell className={row.isBlur ? "blur" : ""}>
                <a title={row.supplierCategory || row.coreCompetence}>
                  {row.supplierCategory || row.coreCompetence}
                </a>
              </CompetenceCell>
              */}
            </ResultTableRow>
          </TableBody>
        </ResultTable>
      </ResultTableContainer>
    </ResultSelectedContainer>
  );
};
