import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "hooks/useStore";
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
} from "components/scout/scoutByIndex/summary.styled";
import demoData from "components/scout/summaryCategoryData";

type TSummary = {
  lastQ: string;
  title: string;
  L2selected: string;
  L3selected: string;
  categories: any;
  suppliersA: any;
  suppliersB: any;
};

function determineSummary(
  queryString: string,
  flags: any,
  stats: any
): TSummary {
  const summary: TSummary = {
    lastQ: "",
    title: "",
    L2selected: "",
    L3selected: "",
    categories: undefined,
    suppliersA: undefined,
    suppliersB: undefined,
  };
  // TODO: determine summary title by filterData.q
  if (flags.L2 && queryString === `${flags.L3 || ""}`) {
    summary.lastQ = flags.L2;
  } else {
    flags.L2 = null;
    flags.L3 = null;
    summary.lastQ = queryString;
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

const SummaryCategories = ({
  L2,
  L2selected,
  L3,
  L3selected,
  setQueryString,
}: {
  L2: any[];
  L2selected: string;
  L3: any[];
  L3selected: string;
  setQueryString: (queryString: string) => void;
}) => {
  const { t } = useTranslation();
  if (!L2?.length) return null;

  const onL2Click = (L2: string) => {
    setQueryString(L2);
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

interface ISummaryProps {
  queryString: string;
  setQueryString: (queryString: string) => void;
}

export default function Summary({
  queryString,
  setQueryString,
}: ISummaryProps) {
  const { t } = useTranslation();
  const { stats, filterData, setFilterData, flags } = useStore();

  const [summary, setSummary] = useState<TSummary>(
    determineSummary(queryString, flags, stats) || {}
  );
  useEffect(() => {
    if (filterData.q === summary.lastQ) return;
    setSummary(determineSummary(queryString, flags, stats));
  }, []);

  const getCategoryIconSrcByName = (name: string) => {
    return `https://stsupplybridgeprod.blob.core.windows.net/images/L2/${name
      .split(/[\s/]+/)
      .join("")}.jpeg`;
  };

  if (!summary.L2selected) return null;

  return (
    <>
      <SummaryContainer>
        <div>
          <SummaryCenterColumn>
            <SummaryCategoryIcon
              src={getCategoryIconSrcByName(summary.title)}
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
                      setQueryString(summary.L2selected);
                    } else {
                      flags.L3 = name;
                      setQueryString(`${name}`);
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
        setQueryString={setQueryString}
      />
    </>
  );
}
