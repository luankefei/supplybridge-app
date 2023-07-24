import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { ITableData } from "../scoutResultTable/helper";
import { useEffect, useState } from "react";
import { Clear } from "@mui/icons-material";
import { BadgeType } from "components/ui-components/supBadge";

export interface FilterValue {
  names: string[];
  headquarters: string[];
  globalFootprints: string[];
  badges: BadgeType[];
}

export interface FilterDataset {
  names: Set<string>;
  headquarters: Set<string>;
  globalFootprints: Set<string>;
  badges: Set<BadgeType>;
}

interface Props {
  initialValue: FilterDataset;
  onFilterChange: (filter: FilterValue) => void;
}

/**
 * Util component for table filters, drop down selector
 */
const MySelector = (props: {
  label: string;
  data: Set<string>;
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const { label, data, value, onChange } = props;
  const handleClear = () => {
    onChange([]);
  };
  return (
    <FormControl
      size="small"
      fullWidth
      sx={{ width: "200px", marginRight: "8px" }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        label={label}
        onChange={(event) => {
          onChange(event.target.value as string[]);
        }}
        input={
          <OutlinedInput
            label={label}
            sx={{ borderRadius: 16, backgroundColor: "#fff" }}
          />
        }
        endAdornment={
          value.length > 0 && (
            <Clear
              style={{ cursor: "pointer", marginRight: "12px" }}
              onClick={handleClear}
            />
          )
        }
      >
        {Array.from(data).map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

/**
 * The table filters
 */
const TableFilters = (props: Props) => {
  const [data, setData] = useState<FilterDataset>();
  const [filter, setFilter] = useState<FilterValue>({
    names: [],
    headquarters: [],
    globalFootprints: [],
    badges: [],
  });
  useEffect(() => {
    props.onFilterChange(filter);
  }, [filter]);

  useEffect(() => {
    setData(props.initialValue);
  }, [props.initialValue]);

  return (
    <Stack direction={"row"}>
      {data?.names && data?.names?.size > 0 && (
        <MySelector
          label="Company Name"
          data={data.names}
          value={filter.names}
          onChange={(value) => {
            setFilter({
              ...filter,
              names: value,
            });
          }}
        />
      )}
      {data?.headquarters && data?.headquarters?.size > 0 && (
        <MySelector
          label="Headquarters"
          data={data.headquarters}
          value={filter.headquarters}
          onChange={(value) => {
            setFilter({
              ...filter,
              headquarters: value,
            });
          }}
        />
      )}
      {data?.globalFootprints && data?.globalFootprints?.size > 0 && (
        <MySelector
          label="Global Footprints"
          data={data.globalFootprints}
          value={filter.globalFootprints}
          onChange={(value) => {
            setFilter({
              ...filter,
              globalFootprints: value,
            });
          }}
        />
      )}
      {data?.badges && data?.badges?.size > 0 && (
        <MySelector
          label="Badges"
          data={data.badges}
          value={filter.badges}
          onChange={(value) => {
            setFilter({
              ...filter,
              badges: value as BadgeType[],
            });
          }}
        />
      )}
    </Stack>
  );
};

export const helperTableDataToFilterDataset = (
  data: ITableData[]
): FilterDataset => {
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
    if (item.badges) {
      for (const badge of item.badges) {
        badges.add(badge);
      }
    }
  });
  return {
    names: name,
    headquarters: hqLocations,
    globalFootprints: footprints,
    badges,
  };
};

export default TableFilters;
