import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GridPaginationModel } from "@mui/x-data-grid";
import { Box, Stack } from "@mui/material";
import { toast } from "react-toastify";

import { LoadingWithBackgroundOverlay } from "components/ui-components/loadingAnimation";
import MapChart from "components/geoChart";
import { ColoredText } from "components/ui-components/text";
import { usePersistentStore, useStore } from "hooks/useStore";
import { useSupplier } from "requests/useSupplier";
import { useFilter } from "requests/useFilter";

import PoweredBy from "components/ui-components/poweredBy";
import { SpacingVertical } from "components/ui-components/spacer";

import ScoutResult, { TScountResult } from "../scoutResult";
import SearchBar, { EnumSearchType } from "./searchBar";
import Summary from "./summary";
import EmptyResult from "./emptyResult";
import DetailsPanel from "./detailPanel";


/**
 * Scout by index page
 * - searchBox
 * - GeoChart
 * - searchResultTable
 */
export default function ScoutByIndex() {
  const { t } = useTranslation();
  const scoutResultRef = useRef<TScountResult>(null)
  const { allSubRegions, allSubRegionsLastUpdatedTime } = usePersistentStore();
  const {
    queryString,
    suppliers,
    stats,
    page,
    pageSize,
    setQueryString,
    setSuppliers,
    setStats,
    setPage,
    setPageSize,
  } = useStore();
  const { querySupplierListByKeyword, querySupplieListByCompany } =
    useSupplier();
  const { getAllSubRegions } = useFilter();

  // We are going to keep an individual copy of searchType
  // as to indicate the searchType of the current search
  // updating searchType inside the searchBar will not trigger a re-render
  // i.e does not change table displays (that showSimilar only shown at searchType === "company")
  const [resultSearchType, setResultSearchType] = useState<EnumSearchType>();
  // A 3 letter country code, set when user clicks on a country in the map
  const [mapSelectedCountry, setMapSelectedCountry] = useState<string>();

  // reset map when user clicks on the reset button, the value is not important
  const [resetMap, setResetMap] = useState(false);
  const [searched, setSearched] = useState(suppliers.length !== 0);
  const [loading, setLoading] = useState(false);

  /**
   * Drawer stacks
   */
  const [drawerStack, setDrawerStack] = useState<JSX.Element[]>([]);


  /********************
   * Component Effects
   * *******************
   */
  useEffect(() => {
    // component did mount, get all subregions if time > 1 day, or if no data
    if (
      Date.now() - allSubRegionsLastUpdatedTime > 86400000 ||
      Object.keys(allSubRegions).length === 0
    ) {
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
  }, [allSubRegions, allSubRegionsLastUpdatedTime, getAllSubRegions]);

  const searchHandler = useCallback(async (
    queryString: string,
    searchType: EnumSearchType,
    page: number,
    pageSize: number
  ) => {
    if (queryString === "") {
      return;
    }
    setQueryString(queryString);
    setLoading(true);
    setResultSearchType(searchType);
    if (searchType === EnumSearchType.Keywords) {
      await querySupplierListByKeyword(queryString, { page, pageSize });
    } else {
      await querySupplieListByCompany(queryString, { page, pageSize });
    }
    setLoading(false);
    setSearched(true);
    setPage(page);
    setPageSize(pageSize);
  }, [querySupplieListByCompany, querySupplierListByKeyword, setPage, setPageSize, setQueryString]);

  const onPaginationModelChange = useCallback(({ page, pageSize }: GridPaginationModel) => {
    searchHandler(
      queryString,
      resultSearchType || EnumSearchType.Keywords,
      page,
      pageSize
    );
  }, [queryString, resultSearchType, searchHandler]);

  const resetView = useCallback(() => {
    setSearched(false);
    setQueryString("");
    setSuppliers([], true);
    setStats({});
    setPage(0);
    setResetMap(!resetMap);
    scoutResultRef.current?.reset();
  }, [resetMap, setPage, setQueryString, setStats, setSuppliers]);

  const handleShowSimilarCompanies = useCallback(async (query: string) => {
    searchHandler(query, EnumSearchType.Companies, page, pageSize);
  }, [page, pageSize, searchHandler]);

  const pushDrawer = useCallback((sid: number) => {
    const newDrawerContent = (
      <DetailsPanel
        open={true}
        supplierId={sid}
        stackCount={drawerStack.length + 1}
        onPushMoreDetails={pushDrawer}
        onPopMoreDetails={() => {
          setDrawerStack((prevStack) => {
            const newStack = [...prevStack];
            newStack.pop();
            return newStack;
          });
        }}
        onClose={() => setDrawerStack([])}
      />
    );
    setDrawerStack((prevStack) => [...prevStack, newDrawerContent]);
  }, [drawerStack.length]);


  const hasData: boolean = useMemo(() => suppliers.length > 0, [suppliers.length]);

  return (
    <Stack>
      {drawerStack.length > 0 && drawerStack[drawerStack.length - 1]}
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

          <SearchBar
            queryString={queryString}
            onSearch={(q, t) => searchHandler(q, t, page, pageSize)}
            onReset={resetView}
          />

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
              {!loading && !searched && (
                <MapChart
                  parentTriggeredReset={resetMap}
                  selectedCountry={mapSelectedCountry}
                  onSelectCountryFilter={(threeLC, count) => {
                    setMapSelectedCountry(threeLC);
                  }}
                />
              )}
              {hasData && (
                <>
                  <Summary
                    queryString={queryString}
                    setQueryString={(s) =>
                      searchHandler(s, EnumSearchType.Keywords, page, pageSize)
                    }
                  />
                  <ScoutResult
                    ref={scoutResultRef}
                    suppliers={suppliers}
                    searchType={resultSearchType || EnumSearchType.Keywords}
                    pageMeta={{
                      stats,
                      page,
                      pageSize
                    }}
                    queryString={queryString}
                    selectedCountry={mapSelectedCountry}
                    onSearch={onPaginationModelChange}
                    onViewDetail={pushDrawer}
                    onShowSimilarCompanies={handleShowSimilarCompanies}
                  />
                </>
              )}
            </Box>
          </Box>
        )}
      </>
    </Stack>
  );
}
