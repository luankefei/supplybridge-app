import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import {
  SpacingDivider,
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import {
  SText,
  STextBody,
  STextCaption,
  STextH1,
  STextH2,
  STextH4,
} from "components/ui-components/text";
import { TSupplierModel } from "models/supplier";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "hooks/useStore";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { NullableImg } from "../scoutByIndex/summary.styled";
import Icon from "components/icon";

export default function BidderList() {
  const { t } = useTranslation();
  const { queryString, suppliers } = useStore();
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [uniqueSupplier, setUniqueSupplier] = useState<TSupplierModel[] | null>(
    null
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue) {
      const potentialTags = inputValue.split(/\r?\n/);
      potentialTags.forEach((t) => t.trim().toLowerCase());
      setTags((prev) => [...prev, ...potentialTags]);
      setInputValue("");
      event.preventDefault();
    }
    if (event.key === "Backspace" && !inputValue) {
      setTags(tags.slice(0, -1));
    }
  };
  const handleDelete = (chipToDelete: string) => {
    setTags(tags.filter((tag) => tag !== chipToDelete));
  };
  const renderTypeAndTag = () => {
    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        <STextH4>You may type or copy-paste your suppliers here</STextH4>
        <Stack gap={1} width={"fit-content"}>
          {tags.map((tag, index) => (
            <Chip
              sx={{ justifyContent: "space-between" }}
              key={index}
              label={tag}
              onDelete={() => handleDelete(tag)}
            />
          ))}
        </Stack>
        <SpacingVertical space="20px" />
        <TextField
          label={"Type a supplier name"}
          multiline
          placeholder="hit enter to add a supplier, backspace to remove"
          sx={{ width: "100%", height: "100%" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>
    );
  };
  const renderSuppliers = () => {
    const items = suppliers.map((s, idx) => (
      <ListItem
        key={idx}
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
        }}
      >
        <ListItemIcon>
          <img width="22px" src={s.logo} alt={s.name} />
        </ListItemIcon>
        <ListItemText>
          {s.name} | {s.headquarterId} | {s.locationId}
        </ListItemText>
      </ListItem>
    ));
    return (
      <List sx={{ width: "100%", maxHeight: "100%", overflow: "auto" }}>
        {items}
      </List>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 400,
      renderCell: (params) => {
        // render logo with name
        const { logo, name, isInnovation } = params.row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NullableImg url={logo} />
            <SpacingHorizontal space="8px" />
            <SText fontSize="16px" fontWeight="normal">
              {name}
            </SText>
            <SpacingHorizontal space="8px" />
            {isInnovation && <Icon src="innovations" width={20} height={20} />}
          </Box>
        );
      },
    },
    {
      field: "headquarterId",
      headerName: "Headquarter ID",
      width: 200,
      renderCell: (params) => {
        const { headquarter, hqCode } = params.row;
        if (!headquarter) {
          return null;
        }
        return (
          <Box sx={{ display: "flex" }} alignItems={"center"}>
            <NullableImg
              url={hqCode ? `/flags/${hqCode?.toLowerCase()}.svg` : ""}
            />
            <SpacingHorizontal space="8px" />
            <SText fontSize="16px" fontWeight="normal">
              {headquarter}
            </SText>
          </Box>
        );
      },
    },
    // { field: "locationId", headerName: "Location ID", width: 200 },
  ];
  const compareResult = () => {
    const unique = suppliers.filter(
      (s) => !tags.includes(s.name.toLowerCase())
    );
    setUniqueSupplier(unique);
  };
  const renderComapreResult = () => {
    if (!uniqueSupplier) {
      return null;
    }
    const countTag = tags.length;
    const matched = suppliers.length - uniqueSupplier.length;
    return (
      <Stack>
        <Paper sx={{ p: 2 }}>
          <STextCaption>{`${matched} matched with your list`}</STextCaption>
          <br />
          <STextH4>{`We found ${uniqueSupplier.length} unique suppliers`}</STextH4>
        </Paper>
        <SpacingVertical space="20px" />
        <Paper sx={{ p: 2 }}>
          <STextH2>{`${uniqueSupplier.length} unique suppliers`}</STextH2>
          <SpacingVertical space="20px" />
          <DataGrid
            sx={{
              border: "none",
              [`& .${gridClasses.withBorderColor}`]: {
                border: "none",
              },
              [`& .${gridClasses.row}`]: {
                bgcolor: "#fff",
                borderRadius: "16px",
              },
              [`& .${gridClasses.cell}`]: {
                border: "none",
              },
            }}
            rows={uniqueSupplier}
            columns={columns}
          />
        </Paper>
      </Stack>
    );
  };
  return (
    <Stack p={2}>
      <STextH1>You are searching for: {queryString} </STextH1>
      <SpacingDivider space="20px" />
      <STextH2 textAlign="left">Bidder List (BDL) Comparision</STextH2>
      <STextBody textAlign="left">
        You can type or upload a list of bidders to compare with the BDL.
      </STextBody>
      <SpacingVertical space="20px" />
      <Card
        component={Stack}
        sx={{
          bgcolor: "rgb(244, 246, 141)",
        }}
        p={3}
        elevation={0}
      >
        We care about your privacy
      </Card>
      <SpacingVertical space="20px" />
      <Stack direction={"row"} gap={2}>
        <Card component={Stack} p={2} id="customer-suppliers" flex={1}>
          BMW suppliers
          <Stack
            bgcolor={"white"}
            p={2}
            height={"400px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {renderTypeAndTag()}
          </Stack>
        </Card>
        <Card component={Stack} p={2} id="our-suppliers" flex={1}>
          Supply bridge
          <Stack
            bgcolor={"white"}
            p={2}
            height={"400px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {renderSuppliers()}
          </Stack>
        </Card>
      </Stack>
      <SpacingVertical space="20px" />
      <Stack>
        <Button sx={{ width: 200 }} variant="contained" onClick={compareResult}>
          compare now
        </Button>
      </Stack>
      {renderComapreResult()}
    </Stack>
  );
}
