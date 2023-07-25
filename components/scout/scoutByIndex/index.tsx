import Feedback from "components/feedback";
import { LoadingWithBackgroundOverlay } from "components/ui-components/loadingAnimation";
import Summary from "./summary";
import { useStore } from "hooks/useStore";
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
import MapChart from "components/geoChart";

/**
 * Scout by index page
 * - searchBox
 * - GeoChart
 * - searchResultTable
 */
export default function ScoutByIndex() {
  const { t } = useTranslation();
  const { allSubRegions, suppliers, setSuppliers, setStats } = useStore();
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
  const [queryString, setQueryString] = useState<string>("");
  // initial data == all data
  const [data, setData] = useState<ITableData[]>([]);
  // table data == filtered data
  const [tableData, setTableData] = useState<ITableData[]>([]);
  // selected rows == GridRowId[] == number[], could be string but we dont use it
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
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
    if (queryString === "") {
      return;
    }
    setQueryString(queryString);
    querySupplierListByName(queryString);
    setSearched(true);
  };
  const resetView = () => {
    setSearched(false);
    setQueryString("");
    setData([]);
    setTableData([]);
    setSuppliers([], true);
    setStats({});
  };
  const handleRowSelect = (selectedRows: number[]) => {
    setSelectedRows(selectedRows);
  };

  /**************
   * Render
   * ************
   */
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
              {((!loading && !searched) || loading || hasData) && (
                <MapChart
                  onSelectCountryFilter={(c) => {
                    console.log("onSelectCountryFilter", c);
                  }}
                />
              )}
              {hasData && (
                <>
                  <Summary queryString={queryString} />
                  <Box sx={{ p: 3 }}>
                    <ActionFilterAndView
                      filterInitialData={initialFilterDataset}
                      resultCount={data?.length || 0}
                      resultType={queryString}
                      onClickBuildMyShortList={() => {
                        console.log("onClickBuildMyShortList");
                      }}
                      onClickBidderList={() => {
                        console.log("onClickBidderList");
                      }}
                      onFilterChange={onFilterChange}
                      onViewChange={function (view: ViewType): void {
                        console.log("onViewChange", view);
                      }}
                      onClickCompare={
                        selectedRows.length > 1
                          ? () => {
                              console.log("onClickCompare", selectedRows);
                            }
                          : undefined
                      }
                    />
                    <ScoutResultTable
                      tableData={tableData}
                      onRowSelect={handleRowSelect}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        )}
      </>

      <Feedback />
    </Stack>
  );
}
