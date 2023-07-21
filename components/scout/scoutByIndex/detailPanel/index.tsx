import { Box, Drawer, IconButton, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNonPersistentStore } from "hooks/useStore";
import { NullableImg } from "../summary.styled";
import { TSupplierModel } from "models/supplier";

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
  const { suppliers } = useNonPersistentStore();
  if (supplierId === undefined) {
    return null;
  }
  const data: TSupplierModel | undefined = suppliers.find(
    (s: any) => s.id === supplierId
  );
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
        <Box sx={{ width: "557px", height: "174px" }}>MAP place holder</Box>
        <Stack direction={"row"}>
          <NullableImg url={data.logo} />
          {data.name}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default DeatilsPanel;
