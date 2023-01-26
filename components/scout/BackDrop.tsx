import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import Icon from "components/Icon";

const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "20%",
  //   transform: 'translate(-50%, -50%)',
  width: 1140,
  height: 600,
  bgcolor: "rgba(249, 250, 251, 0.6)",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: 'center'
};

interface Props{
    isOpen:boolean
}
export default function BackDrop({isOpen=false}:Props) {
  const [open, setOpen] = React.useState(isOpen);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        onClick={handleClose}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Icon src="backdrop-logo" width={82} height={82} />
          <CustomizedTypography id="modal-modal-description" sx={{ mt: 2 }}>
            There are no results matching to this search. Dispatching Scout
            team...
          </CustomizedTypography>
        </Box>
      </Modal>
    </div>
  );
}


const CustomizedTypography=styled(Typography)`
width: 500px;
font-weight: 700;
font-size: 24px;
line-height: 33px;
text-align: center;
color: ${(props) => props.theme.colors.primary};;

`