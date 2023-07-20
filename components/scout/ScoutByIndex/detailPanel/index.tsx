import { Box, Drawer, IconButton, Stack } from "@mui/material";
import { ITableData } from "../scoutResultTable/helper";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import useStore from "hooks/useStore";
import { NullableImg } from "../summary.styled";

interface IDetailPanelProps {
  open: boolean;
  supplierId?: number;
  onClose: () => void;
}

/**
 * Supplier detail panel
 *
 * fetches data from the store
 *
 */
const DeatilsPanel = ({ open, supplierId, onClose }: IDetailPanelProps) => {
  const { suppliers } = useStore();
  if (supplierId === undefined) {
    return null;
  }
  const data = suppliers.find((s: any) => s.id === supplierId);
  if (!data) {
    return null;
  }
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack>
        <Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Box sx={{ height: "140px" }}>MAP place holder</Box>
        <Stack direction={"row"}>
          <NullableImg url={data.logo} />
          {data.name}
          {data.isInnovation}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default DeatilsPanel;
