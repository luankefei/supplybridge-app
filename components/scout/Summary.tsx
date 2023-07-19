import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useStore from "hooks/useStore";
import {
  NullableImg,
  SummaryContainer,
  SummaryCategoryIcon,
  SummaryTitleColumn,
  SummaryTitle,
  SummaryL3Title,
  SummaryColumn,
  SummarySpaceColumn,
  SummaryCenterColumn,
  SummaryLabel,
  SummaryTopList,
  SummaryTopListOne,
  SummarySupplierContainer,
  SummarySupplierTitle,
  SummaryCategoriesContainer,
  SummaryL3,
} from "components/scout/Summary.styled";

import demoData from "components/scout/summaryCategoryData";

function demoRandomPick(obj: any): any {
  if (!obj) return null;
  if (Array.isArray(obj)) {
    if (!obj.length) return null;
    return obj[Math.floor(Math.random() * obj.length)];
  } else {
    return demoRandomPick(Object.keys(obj));
  }
}

function selectNearestL2(L2: string[], q: string) {
  const L2lowercases = L2.map((x: string) => x.toLowerCase());
  const i = L2lowercases.indexOf(q.toLowerCase());
  if (i < 0) return null;
  return L2[i];
}

function doScore(q: any, q0: any) {
  if (q.length < 3) return 0;
  if (!q || !q0) return 0;
  q = q.toLowerCase();
  q0 = q0.toLowerCase();
  if (q0.indexOf(q) >= 0) {
    return q.length / q0.length;
  }
  return 0;
}

function determineSummary(
  filterData: any,
  suppliers: any,
  flags: any,
  stats: any
): any {
  const summary: any = {};
  // TODO: determine summary title by filterData.q
  if (flags.L2 && filterData.q === `${flags.L3 || ""}`) {
    summary.lastQ = flags.L2;
  } else {
    flags.L2 = null;
    flags.L3 = null;
    summary.lastQ = filterData.q;
  }

  const chain = stats.chain;
  const L2ch = chain?.[0];
  const L3ch = chain?.[1];

  if (L2ch) {
    summary.title = L2ch;
    summary.L2selected = summary.title;
    summary.L3selected = L3ch;
    summary.categories = stats.chainChildren;
  } else {
    summary.title = summary.lastQ;
    summary.categories = null;
  }

  let selectedSuppliers;
  if (summary.title) {
    selectedSuppliers = stats.maj ? stats.maj.slice() : [];
    summary.suppliersA = stats.maj ? stats.maj.slice() : [];
    summary.suppliersB = stats.str ? stats.str.slice() : [];
  }
  //summary.suppliersA = selectedSuppliers.slice(0, 5);
  //summary.suppliersB = selectedSuppliers.slice(3, 6);
  //summary.suppliersC = selectedSuppliers.slice(6, 9);
  return summary;
}

function transformName(name: any) {
  if (!name) return name;
  return name.toUpperCase();
}

const Supplier = (props: any) => {
  return (
    <SummarySupplierContainer>
      <NullableImg
        url={
          props.logo || "https://cdn-stage.supplybridge.com/images/logos/no.png"
        }
      />
      <SummarySupplierTitle>{transformName(props.name)}</SummarySupplierTitle>
    </SummarySupplierContainer>
  );
};

const Suppliers = (props: any) => {
  return props.data?.map((z: any, i: number) => (
    <Supplier key={i} logo={z.logo} name={z.longName || z.name} />
  ));
};

const SummaryCategories = (props: any) => {
  const { t } = useTranslation();
  const { flags, setFilterData } = useStore();
  const { L2, L2selected, L3, L3Selected } = props;
  if (!L2?.length) return null;

  const onL2Click = (L2: string) => {
    flags.q = L2;
    setFilterData({ q: L2 });
  };

  function check(name: any, name0: any) {
    if (name === "Steering System / Steering Gear" && name0 === "Steering Gear")
      return true;
    if (name === "Battery" && name0 === "HV Battery") return true;
    if (name === "Battery" && name0 === "HV Battery") return true;
    if (name === "Starter System" && name0 === "Starter Battery") return true;
    return name === name0;
  }

  return (
    <SummaryCategoriesContainer>
      <div className="cat-L2-list">
        {L2.map((name: string, i: number) => (
          <span
            className={`cat-L2 ${check(L2selected, name) ? "active" : ""}`}
            onClick={() => onL2Click(name)}
            key={i}
          >
            {t(`scout.summaryCard.demo.${name}`, name)}
          </span>
        ))}
        <span className="cat-L2 cat-L2-more">
          {t("scout.summaryCard.demo.more", "More Categories")}
        </span>
      </div>
    </SummaryCategoriesContainer>
  );
  // TODO: L3 -> object (innovation -> icon) displayed before L3 name
};

const summaryHiddenList = [
  "wheel",
  "starter battery",
  "hv battery",
  "recycling, reuse",
  "software",
  "semiconductor",
];
function isHidden(f: any) {
  const q = f.q && f.q.toLowerCase();
  if (summaryHiddenList.includes(q)) return "";
  return "hidden";
}

export default function Summary() {
  const { t } = useTranslation();
  const { suppliers, filterData, setFilterData, flags, stats } = useStore();

  const [summary, setSummary] = useState(
    determineSummary(filterData, suppliers, flags, stats) || {}
  );
  useEffect(() => {
    if (filterData.q === summary.lastQ) return;
    setSummary(determineSummary(filterData, suppliers, flags, stats));
  }, [suppliers]);

  if (!summary.L2selected) return null;

  return (
    <>
      <SummaryContainer>
        <div>
          <SummaryCenterColumn>
            <SummaryCategoryIcon
              src={`https://stsupplybridgeprod.blob.core.windows.net/images/L2/${summary.title
                .split(/[\s/]+/)
                .join("")}.jpeg`}
            />
          </SummaryCenterColumn>
          <SummaryTitleColumn>
            <SummaryLabel></SummaryLabel>
            <SummaryTitle>{summary.title}</SummaryTitle>
            {summary.L3selected ? (
              <SummaryL3Title>{summary.L3selected}</SummaryL3Title>
            ) : null}
          </SummaryTitleColumn>
          {summary?.categories ? (
            <SummarySpaceColumn space={20}>
              <SummaryLabel>Categories</SummaryLabel>
              {summary.categories.map((name: string, i: number) => (
                <SummaryL3
                  className={flags.L3 === name ? "active" : ""}
                  key={i}
                  onClick={() => {
                    flags.L2 = summary.L2selected;
                    if (flags.L3 === name) {
                      flags.L3 = "";
                      setFilterData({ q: `${summary.L2selected}` });
                    } else {
                      flags.L3 = name;
                      setFilterData({ q: `${name}` });
                    }
                  }}
                >
                  {name}
                </SummaryL3>
              ))}
            </SummarySpaceColumn>
          ) : null}
          <SummarySpaceColumn space={50}>
            {summary?.L2selected ? (
              <>
                <SummaryTopList>
                  <SummaryTopListOne>
                    <SummaryLabel>
                      {t("scout.summaryCard.topSuppliers", "Top Suppliers")}
                    </SummaryLabel>
                    <Suppliers data={summary.suppliersA} />
                  </SummaryTopListOne>
                  <SummaryTopListOne>
                    <SummaryLabel>
                      {t("scout.summaryCard.risingStars", "Rising Stars")}
                    </SummaryLabel>
                    <Suppliers data={summary.suppliersB} />
                  </SummaryTopListOne>
                </SummaryTopList>
              </>
            ) : null}
          </SummarySpaceColumn>
        </div>
      </SummaryContainer>
      <SummaryCategories
        L2={Object.keys(demoData.L2L3)}
        L2selected={summary.L2selected}
        L3={summary?.categories}
        L3selected={""}
      />
    </>
  );
}
