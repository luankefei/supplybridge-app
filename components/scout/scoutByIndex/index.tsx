import Feedback from "components/feedback";
import { LoadingWithBackgroundOverlay } from "components/ui-components/loadingAnimation";
import Summary from "./summary";
import { usePersistentStore, useStore } from "hooks/useStore";
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
import SearchBar, { EnumSearchType } from "./searchBar";
import LanguageSelector from "components/languageSelector";
import EmptyResult from "./emptyResult";
import { useFilter } from "requests/useFilter";
import MapChart from "components/geoChart";
import { toast } from "react-toastify";
import ShortListModal from "./shortlistModal";
import { TwoLetterCodeToCountryCodeMap } from "components/geoChart/geoIdMap";
import { useRouter } from "next/router";

/**
 * Scout by index page
 * - searchBox
 * - GeoChart
 * - searchResultTable
 */
export default function ScoutByIndex() {
  const { t } = useTranslation();
  const router = useRouter();
  const { allSubRegions } = usePersistentStore();
  const { suppliers, stats, setSuppliers, setStats } = useStore();
  const { querySupplierListByKeyword, querySupplieListByCompany } =
    useSupplier();
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
  // We are going to keep an individual copy of searchType
  // as to indicate the searchType of the current search
  // updating searchType inside the searchBar will not trigger a re-render
  // i.e does not change table displays (that showSimilar only shown at searchType === "company")
  const [resultSearchType, setResultSearchType] = useState<EnumSearchType>();
  // initial data == all data
  const [data, setData] = useState<ITableData[]>([]);
  // table data == filtered data
  const [tableData, setTableData] = useState<ITableData[]>([]);
  // selected rows == GridRowId[] == number[], could be string but we dont use it
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // A 3 letter country code, set when user clicks on a country in the map
  const [mapSelectedCountry, setMapSelectedCountry] = useState<string>();
  const [filterValue, setFilterValue] = useState<FilterValue>();

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shortListModalOpen, setShortListModalOpen] = useState(false);
  const [viewType, setView] = useState<ViewType>(ViewType.LIST);

  /********************
   * Component Effects
   * *******************
   */
  useEffect(() => {
    // component did mount, get all subregions if not already fetched
    if (Object.keys(allSubRegions).length === 0) {
      getAllSubRegions()
        .then((res) => {
          if (res === null) {
            toast.error(
              "Failed to get all subregions. Please try again later."
            );
          }
        })
        .catch((err) => {
          toast.error("Failed to get all subregions. Please try again later.");
        });
    }
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

  useEffect(() => {
    reCalTableData(filterValue, mapSelectedCountry);
  }, [mapSelectedCountry]);

  /********************
   * Component Functions
   *********************/
  const reCalTableData = (fv?: FilterValue, sc?: string) => {
    let fvFilter = (s: any) => true;
    if (fv !== undefined) {
      const { names, headquarters, globalFootprints, badges } = fv;
      fvFilter = (s: any) => {
        const { name, headquarter, globalFootprint, badges: sbadges } = s;
        return (
          (names.length === 0 || names.includes(name)) &&
          (headquarters.length === 0 || headquarters.includes(headquarter)) &&
          (globalFootprints.length === 0 ||
            hasIntersection(globalFootprint, globalFootprints)) &&
          (badges.length === 0 || badges.some((b) => sbadges.includes(b)))
        );
      };
    }
    let scFilter = (s: any) => true;
    if (sc !== undefined) {
      scFilter = (s: any) => {
        const { globalFootprintIds } = s;
        return globalFootprintIds.find((gfi: number) => {
          const twoLC = allSubRegions[gfi]?.code;
          const threeLC = TwoLetterCodeToCountryCodeMap[twoLC];
          return threeLC === mapSelectedCountry;
        });
      };
    }
    const newData = data.filter(fvFilter).filter(scFilter);
    setTableData(newData);
  };

  const onFilterChange = (fv: FilterValue) => {
    setFilterValue(fv);
    reCalTableData(fv, mapSelectedCountry);
  };

  const searchHandler = async (
    queryString: string,
    searchType: EnumSearchType
  ) => {
    if (queryString === "") {
      return;
    }
    setQueryString(queryString);
    setLoading(true);
    setResultSearchType(searchType);
    if (searchType === EnumSearchType.Keywords) {
      await querySupplierListByKeyword(queryString);
    } else {
      await querySupplieListByCompany(queryString);
    }
    setLoading(false);
    setSearched(true);
  };
  const resetView = () => {
    setSearched(false);
    setQueryString("");
    setData([]);
    setTableData([]);
    setSuppliers([], true);
    setStats({});
    setMapSelectedCountry(undefined);
  };
  const handleRowSelect = (selectedRows: number[]) => {
    if (selectedRows.length > 3) {
      toast.error("You can only select up to 3 companies.");
      return;
    }
    setSelectedRows(selectedRows);
  };

  const handleShowSimilarCompanies = async (query: string) => {
    searchHandler(query, EnumSearchType.Companies);
  };

  /**************
   * Render
   * ************
   */
  // temp hack to add empty rows for blur
  // TODO: Remove this.
  const emptyRows = new Array(10);
  for (let i = 0; i < 10; i++) {
    emptyRows[i] = { id: i + data.length };
  }
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
                  selectedCountry={mapSelectedCountry}
                  onSelectCountryFilter={(threeLC) => {
                    setMapSelectedCountry(threeLC);
                  }}
                />
              )}
              {hasData && (
                <>
                  <Summary queryString={queryString} />
                  <Box sx={{ p: 3 }}>
                    <ActionFilterAndView
                      filterInitialData={initialFilterDataset}
                      resultCount={stats.count || 0}
                      displayCount={data?.length || 0}
                      resultType={queryString}
                      onClickBuildMyShortList={() => {
                        setShortListModalOpen(true);
                      }}
                      onClickBidderList={() => {
                        console.log("onClickBidderList");
                      }}
                      onFilterChange={onFilterChange}
                      view={viewType}
                      onViewChange={setView}
                      onClickCompare={
                        selectedRows.length > 1
                          ? () => {
                              console.log("onClickCompare", selectedRows);
                              router.push({
                                pathname: "/scout/compare",
                                query: {
                                  suppliers: selectedRows.join(","),
                                },
                              });
                            }
                          : undefined
                      }
                    />
                    <ScoutResultTable
                      viewType={viewType}
                      searchType={resultSearchType || EnumSearchType.Keywords}
                      tableData={tableData.concat(emptyRows)}
                      selectedRows={selectedRows}
                      onRowSelect={handleRowSelect}
                      onShowSimilarCompanies={handleShowSimilarCompanies}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        )}
      </>
      <ShortListModal
        open={shortListModalOpen}
        onClose={(tags?: string[]) => {
          console.log("tags", tags);
          setShortListModalOpen(false);
        }}
      />
      <Feedback />
    </Stack>
  );
}
