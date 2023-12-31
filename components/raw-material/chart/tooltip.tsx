import { Box, Stack } from "@mui/material";
import { SText } from "components/ui-components/text";

const CustomTooltip = (props: {
  active?: boolean;
  payload?: any[];
  label?: string;
  viewBox?: { width: number; height: number };
  coordinate?: { x: number; y: number };
}) => {
  const { active, payload, label, viewBox, coordinate } = props;
  if (active && payload && payload.length) {
    if (coordinate && isNaN(coordinate.x) && viewBox) {
      coordinate.x = viewBox.width / 2;
    }
    return (
      <Box>
        <Stack borderRadius={"8px"} bgcolor={"#374151"} p={1}>
          <SText color="#9CA3AF" fontSize="12px" lineHeight="20px">
            mm/dd/yyyy
          </SText>
          <SText color="white" fontSize="14px" lineHeight="20px">
            {label}
          </SText>
          <SText color="white" fontSize="14px" lineHeight="20px">
            ${payload[0].value.toFixed(2)}
          </SText>
        </Stack>
      </Box>
    );
  }

  return null;
};

export default CustomTooltip;
