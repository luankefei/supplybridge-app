import Feedback from "components/Feedback";
import { LoadingWithBackgroundOverlay } from "components/ui-components/loadingAnimation";
import GeoCharts from "components/scout/GeoCharts";
import Summary from "components/scout/Summary";
import useStore from "hooks/useStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSupplier } from "requests/useSupplier";
import ScoutResultTable from "./scoutResultTable";
import { Box, Stack } from "@mui/material";
import { ColoredText } from "components/ui-components/text";
import PoweredBy from "components/ui-components/poweredBy";
import { SpacingVertical } from "components/ui-components/spacer";
import ActionFilterAndView, { ViewType } from "./actionFilterAndView";
import {
  ITableData,
  supplierModelToTableData,
} from "./scoutResultTable/helper";
import {
  FilterDataset,
  FilterValue,
  helperTableDataToFilterDataset,
} from "./actionFilterAndView/tableFilters";
import { hasIntersection } from "utils/array";
import SearchBar from "./searchBar";
import LanguageSelector from "components/languageSelector";
import EmptyResult from "./emptyResult";
import { useFilter } from "requests/useFilter";

/**
 * Scout by index page
 * - searchBox
 * - GeoChart
 * - searchResultTable
 */
export default function ScoutByIndex() {
  const { t } = useTranslation();
  const { allSubRegions, suppliers, stats } = useStore();
  const { querySupplierListByName, loading } = useSupplier();
  const { getAllSubRegions } = useFilter();

  /******************
   * Component states
   * ****************
   */
  const [initialFilterDataset, setinitialFilterValue] = useState<FilterDataset>(
    {
      names: new Set(),
      headquarters: new Set(),
      globalFootprints: new Set(),
      badges: new Set(),
    }
  );
  // initial data == all data
  const [data, setData] = useState<ITableData[]>([]);
  // table data == filtered data
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [queryString, setQueryString] = useState<string>("");
  const [searched, setSearched] = useState(false);

  /********************
   * Component Effects
   * *******************
   */
  useEffect(() => {
    // component did mount, get all subregions
    getAllSubRegions();
  }, []);

  useEffect(() => {
    const initialData: ITableData[] = suppliers?.map((s: any, i: number) =>
      supplierModelToTableData(s, i, allSubRegions)
    );
    const initialFilterData: FilterDataset =
      helperTableDataToFilterDataset(initialData);
    setinitialFilterValue(initialFilterData);
    setData(initialData);
    setTableData(initialData);
  }, [suppliers, allSubRegions]);

  /********************
   * Component Fnctions
   *********************/
  const onFilterChange = (fv: FilterValue) => {
    const newData = data.filter((s: any) => {
      const { name, headquarter, globalFootprint, badges } = s;
      const { names, headquarters, globalFootprints, badges: fvBadges } = fv;
      return (
        (names.length === 0 || names.includes(name)) &&
        (headquarters.length === 0 || headquarters.includes(headquarter)) &&
        (globalFootprints.length === 0 ||
          hasIntersection(globalFootprint, globalFootprints)) &&
        (fvBadges.length === 0 || fvBadges.some((fvb) => badges.includes(fvb)))
      );
    });
    setTableData(newData);
  };
  const searchHandler = (queryString: string) => {
    setQueryString(queryString);
    // woulda put this in SearchBar but then loading wouldnt work that way.
    querySupplierListByName(queryString);
    setSearched(true);
  };
  const resetView = () => {
    setSearched(false);
  };

  const hasData: boolean = data.length > 0;
  return (
    <Stack>
      <LanguageSelector />
      {loading && <LoadingWithBackgroundOverlay />}
      <>
        <Stack sx={{ justifyContent: "center" }}>
          {!hasData && (
            <Box margin={"auto"}>
              <SpacingVertical space="100px" />
              <ColoredText>
                {t(
                  "scout.title",
                  "Global Scouting, for Automotive professionals."
                )}
              </ColoredText>
              <PoweredBy center />
            </Box>
          )}

          <SearchBar onSearch={searchHandler} onReset={resetView} />

          {hasData && (
            <Box margin={"auto"}>
              <SpacingVertical space="16px" />
              <PoweredBy />
            </Box>
          )}
        </Stack>
        {!loading && searched && !hasData && <EmptyResult />}
        {((!loading && !searched) || loading || hasData) && (
          <Box>
            <SpacingVertical space="40px" />
            <Box>
              <GeoCharts />
              {hasData && <Summary />}
              <ActionFilterAndView
                filterInitialData={initialFilterDataset}
                resultCount={stats?.count || data?.length || 0}
                resultType={queryString}
                onClickBuildMyShortList={() => {
                  console.log("onClickBuildMyShortList");
                }}
                onClickBidderList={() => {
                  console.log("onClickBidderList");
                }}
                onFilterChange={onFilterChange}
                onViewChange={function (view: ViewType): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <ScoutResultTable tableData={tableData} />
            </Box>
          </Box>
        )}
      </>

      <Feedback />
    </Stack>
  );
}
