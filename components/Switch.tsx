import { theme } from "config/theme";
import useStore from "hooks/useStore";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import useBoundStore from "hooks/useBoundStore";
import styled from "styled-components";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";
import ScoutByIndex from "./scout/ScoutByIndex";
import ScoutByQuickBridge from "./scout/ScoutByQuickBridge";
import { useQuickBridgeSupplier } from "requests/useScoutByScoutBridge";

export default function Switch() {
  const { resetAllSelected } = useQuickBridgeSupplier();
  const { quickBridgeStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
  }));
  const { setResult, setTab, setFilter, setSelectedLabel } = quickBridgeStore;
  // const [selected, setSelected] = useState("byIndex");
  const { setFilterData, clearFilterData, setSuppliers } = useStore();

  const clearFilter = () => {
    setResult(false);
    setTab(0);
    setFilter("vehicleTypes", null);
    setFilter("vehicleBrands", null);
    setFilter("vehicleModels", null);
    setFilter("vehicleFuelTypes", null);
    setFilter("commodities", null);
    setFilter("productionTechnologies", null);
    setFilter("pioneers", null);
    clearFilterData();
    resetAllSelected();
    setSelectedLabel("");
  };

  const [selected, setSelected] = useState(ScoutSwitchType.index);
  // const { setFilterData, setSuppliers } = useStore();
  const router = useRouter();
  const handleSwitchSelected = (val: ScoutSwitchType) => {
    setSelected(val);
    router.push(`/scout/${val}`);
  };

  useEffect(() => {
    clearFilterData();
    setSuppliers([], true);
  }, [selected]);

  useEffect(() => {
    if (
      router.query &&
      router.query.slug &&
      Array.isArray(router.query.slug) &&
      router.query.slug.length > 0
    ) {
      if (router.query.slug[0] === ScoutSwitchType.quickBridge) {
        setSelected(ScoutSwitchType.quickBridge);
      } else {
        setSelected(ScoutSwitchType.index);
      }
    }
  }, [setSelected]);

  return (
    <Container>
      <SwitchContainer>
        <Switches>
          <Background selected={selected}></Background>
          <ByIndex
            selected={selected}
            onClick={() => {
              clearFilter();
              handleSwitchSelected(ScoutSwitchType.index);
            }}
          >
            Scout by Index
          </ByIndex>
          <ByQuickBridge
            selected={selected}
            onClick={() => handleSwitchSelected(ScoutSwitchType.quickBridge)}
          >
            Scout by QuickBridge
          </ByQuickBridge>
        </Switches>
      </SwitchContainer>
      {selected === ScoutSwitchType.index ? (
        <ScoutByIndex />
      ) : (
        <ScoutByQuickBridge />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SwitchContainer = styled.div`
  @media (min-width: ${theme.dimension.cardMaxWidth}) {
    width: ${theme.dimension.cardMaxWidth};
  }
  height: 56px;
  margin: 36px 0;
  display: flex;
  justify-content: space-between;
`;

const Switches = styled.div`
  width: 348px;
  height: 56px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Background = styled.div<any>`
  left: ${(props) =>
    props.selected === ScoutSwitchType.index ? "5px" : "169px"};
  top: 5;
  position: absolute;
  width: 174px;
  height: 46px;
  background: #08979c;
  border-radius: 16px;
  transition: 0.5s;
`;

const ByIndex = styled.span<any>`
  width: 50%;
  padding: 6px 10px;
  border-radius: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) =>
    props.selected === ScoutSwitchType.index ? "#fff" : "#808080"};
  cursor: pointer;
  background: transparent;
  position: relative;
  transition: 0.5s;
`;

const ByQuickBridge = styled.span<any>`
  width: 50%;
  padding: 6px 10px;
  border-radius: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) =>
    props.selected === ScoutSwitchType.quickBridge ? "#fff" : "#808080"};
  cursor: pointer;
  background: transparent;
  position: relative;
  transition: 0.5s;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Icon = styled.div`
  color: #2c71f0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 18px;
  height: 18px;
  border: 2px solid #2c71f0;
  border-radius: 100%;
`;
const Text = styled.span`
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #2c71f0;
`;
