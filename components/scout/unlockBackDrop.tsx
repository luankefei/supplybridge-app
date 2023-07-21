import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import Icon from "components/icon";
import { theme } from "config/theme";
const style = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  marginTop: "48px",
};

interface Props {
  isOpen: boolean;
}
export default function BackDrop({ isOpen = false }: Props) {
  const [open, setOpen] = React.useState(isOpen);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Box sx={style}>
        <Icon src="lock-results" width={98.86} height={98.86} />
        <CustomizedTypography id="modal-modal-description" sx={{ mt: 2 }}>
          Unlock with Membership
        </CustomizedTypography>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 1068px;
  height: 500px;
  background-color: rgba(249, 250, 251, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(25px);
  border-radius: 16px;
  position: absolute;
  top: 0;
  left: 0;
`;

const CustomizedTypography = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #dbcf62;
`;
