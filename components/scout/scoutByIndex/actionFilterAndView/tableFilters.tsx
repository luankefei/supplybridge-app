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
import { useTranslation } from "react-i18next";

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
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: "#fff",
            },
          },
        }}
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
  const { t } = useTranslation();
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
      {data?.headquarters && data?.headquarters?.size > 0 && (
        <MySelector
          label={t("scout.result.hqLocation")}
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
          label={t("scout.result.footprint")}
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
