import { Box, Stack } from "@mui/material";
import { SText } from "components/ui-components/text";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: Date;
}) => {
  if (active && payload && payload.length) {
    return (
      <Box>
        <Stack borderRadius={"8px"} bgcolor={"#374151"} p={1}>
          <SText color="white" fontSize="14px">
            {label?.toDateString()}
          </SText>
          <SText color="white" fontSize="14px">
            ${payload[0].value}
          </SText>
        </Stack>
      </Box>
    );
  }

  return null;
};

export default CustomTooltip;
