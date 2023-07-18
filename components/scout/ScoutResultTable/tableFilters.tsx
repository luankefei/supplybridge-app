import { Box, MenuItem, Select } from "@mui/material";
import { BadgeType, ITableData } from "./helper";
import { useEffect, useState } from "react";

interface FilterValue {
  name: string[];
  hqLocations: string[];
  footprints: string[];
  badges: BadgeType[];
}

interface FilterDataset {
  names: Set<string>;
  headquarters: Set<string>;
  globalFootprints: Set<string>;
  badges: Set<BadgeType>;
}

interface Props {
  data: ITableData[];
  onFilterChange: (filter: FilterValue) => void;
}

const TableFilters = (props: Props) => {
  const [data, setData] = useState<FilterDataset>();
  const [filter, setFilter] = useState<FilterValue>({
    names: [],
    hqLocations: [],
    footprints: [],
    badges: [],
  });
  useEffect(() => {
    const { data } = props;
    const name: Set<string> = new Set();
    const hqLocations: Set<string> = new Set();
    const footprints: Set<string> = new Set();
    const badges: Set<BadgeType> = new Set();
    data.forEach((item) => {
      if (item.name) {
        name.add(item.name);
      }
      if (item.headquarter) {
        hqLocations.add(item.headquarter);
      }
      if (item.globalFootprint) {
        Object.values(item.globalFootprint).forEach((footprint) => {
          footprints.add(footprint);
        });
      }
      if (item.badge) {
        for (const key in item.badge) {
          if (item.badge[key as BadgeType]) {
            badges.add(key as BadgeType);
          }
        }
      }
    });
    setData({
      names: name,
      headquarters: hqLocations,
      globalFootprints: footprints,
      badges,
    });
  }, [props.data]);
  const mapToMenuItem = (set: Set<string>) => {
    return Array.from(set).map((item, idx) => (
      <MenuItem key={idx}>{item}</MenuItem>
    ));
  };

  return (
    <Box>
      {data?.names && data?.names?.size > 0 && (
        <Select multiple value={filter.name}>
          {mapToMenuItem(data.names)}
        </Select>
      )}

      {data?.headquarters && data?.headquarters?.size > 0 && (
        <Select multiple value={filter.hqLocations}>
          {mapToMenuItem(data.headquarters)}
        </Select>
      )}

      {data?.globalFootprints && data?.globalFootprints?.size > 0 && (
        <Select multiple value={filter.footprints}>
          {mapToMenuItem(data.globalFootprints)}
        </Select>
      )}

      {data?.badges && data?.badges?.size > 0 && (
        <Select multiple value={filter.badges}>
          {mapToMenuItem(data.badges)}
        </Select>
      )}
    </Box>
  );
};

export default TableFilters;
