import Feedback from "components/Feedback";
import LoadingAnimation, {
  LoadingWithBackgroundOverlay,
} from "components/LoadingAnimation";
import Survicate from "components/Survicate";
import BackDrop from "components/scout/BackDrop";
import Filters from "components/scout/Filters";
import GeoCharts from "components/scout/GeoCharts";
import { ResultSelected } from "components/scout/ResultTable";
import { SearchBar2 } from "components/scout/SearchBar";
import Summary from "components/scout/Summary";
import useStore from "hooks/useStore";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFilter } from "requests/useFilter";
import { useSupplier } from "requests/useSupplier";
import { useVehicleFuelTypes } from "requests/useVehicleFuelTypes";
import styled from "styled-components";
import ScoutResultTable from "../ScoutResultTable";
import { Box, Button, Stack } from "@mui/material";
import { ColoredText, SText, TitleText } from "components/ui-components/text";
import PoweredBy from "components/ui-components/poweredBy";
import { SpacingVertical } from "components/ui-components/spacer";

/**
 * Scout by index page
 * - searchBox
 * - GeoChart
 * - searchResult
 */
export default function ScoutByIndex() {
  const { t } = useTranslation();
  const {
    suppliers,
    count,
    setFilterData,
    filterData,
    clearFilterData,
    showBackdrop,
    flags,
    stats,
  } = useStore();
  const { getCommodities, getRegions } = useFilter();
  const { searchSuppliers, loading } = useSupplier();
  const { searchFuelTypes } = useVehicleFuelTypes();

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const onFilterModalCancel = () => setFilterModalVisible(false);
  const [surveyOn, setSurveyOn] = useState(false);

  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
  const pageLoaded = useRef(false);
  const searchString = useRef(filterData.q);

  useEffect(() => {
    getInitialRequests();
  }, []);

  useEffect(() => {
    if (!flags.q) {
      searchString.current = "";
      return;
    }
    searchString.current = filterData.q;
  }, [filterData]);

  useEffect(() => {
    countRef.current = stats?.count || count;
  }, [count, stats]);

  const getInitialRequests = () => {
    if (!pageLoaded.current) {
      pageLoaded.current = true;
      getCommodities();
      getRegions();
      searchSuppliers(1, true);
      searchFuelTypes();
    }
  };

  const searchSupplierHandler = async () => {
    const currentPage = pageRef.current;
    if (currentPage * 10 < countRef.current) {
      await searchSuppliers(currentPage + 1, false, searchString.current);
      pageRef.current = currentPage + 1;
      infiniteScrollControl.current = true;
    }
  };

  const searchHandler = () => {
    searchSuppliers(1, true);
    console.log("searching.....");
  };

  const isSuppliersNotEmpty: boolean =
    suppliers?.length > 0 && Object.keys(suppliers[0]).length > 0;

  const onSelectedBackClick = () => {
    flags.selected = null;
    const q = flags.back;
    flags.back = "";
    flags.type = "Companies";
    clearFilterData();
    setFilterData({ q });
  };
  return (
    <Stack>
      {loading && <LoadingWithBackgroundOverlay />}
      <Box>
        {flags.selected ? (
          <Box onClick={onSelectedBackClick}>
            <span>&#x1f860;</span> BACK
          </Box>
        ) : (
          <Stack sx={{ justifyContent: "center" }}>
            {!isSuppliersNotEmpty && (
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
            <SearchBar2 onSearch={searchHandler} />
            {isSuppliersNotEmpty && (
              <Box margin={"auto"}>
                <SpacingVertical space="16px" />
                <PoweredBy />
              </Box>
            )}
          </Stack>
        )}
        <Box>
          <SpacingVertical space="40px" />
          <BackDrop isOpen={!isSuppliersNotEmpty && showBackdrop} />
          <Box>
            <GeoCharts />
            {flags.selected ? (
              <ResultSelected selected={flags.selected} />
            ) : null}
            {isSuppliersNotEmpty && (
              <Filters totalCount={stats?.count || count} />
            )}
            {isSuppliersNotEmpty && !flags.selected && <Summary />}

            <div
              style={{
                padding: "12px",
                width: "100%",
                margin: "8px",
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {suppliers?.length > 0 ? (
                <div>
                  <Button
                    onClick={() => {
                      setFilterModalVisible(true);
                      setSurveyOn(true);
                    }}
                  >
                    {t("scout.buildMyShortlist", "Build my Shortlist")}
                  </Button>
                  {surveyOn ? (
                    <Survicate loadSurvey={surveyOn} onClose={() => {}} />
                  ) : null}
                </div>
              ) : null}
            </div>

            <ScoutResultTable />
            {/* <ResultTable /> */}
          </Box>
        </Box>
      </Box>

      <Feedback />
    </Stack>
  );
}
