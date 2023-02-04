import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import Icon from "components/Icon";
import { theme } from "config/theme";
const style = {
  position: "absolute" as "absolute",
  top: {md: "312px", lg: "338px",  xl: "350px"},
  left:  `${theme.dimension.leftMenuWidth}`,
  width:   `calc(100% - ${theme.dimension.leftMenuWidth})`,
  height: {sm: 'calc(100% - 320px)',  md: 'calc(100% - 312px)', lg: 'calc(100% - 330px)', xl: 'calc(100% - 345px)'},
  bgcolor: "rgba(249, 250, 251, 0.6)",
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: 'center',
 backdropFilter: 'blur(35px)',
};


interface Props{
    isOpen:boolean
}
export default function BackDrop({isOpen=false}:Props) {
  const [open, setOpen] = React.useState(isOpen);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        onClick={handleClose}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
            <Icon src="backdrop-logo" width={82} height={82} />
          <CustomizedTypography id="modal-modal-description" sx={{ mt: 2 }}>
            There are no results matching to this search.<br/>
            Dispatching Scout
            team...
          </CustomizedTypography>
        </Box>
      </Modal>
    </div>
  );
}


const CustomizedTypography=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 29px;
text-align: center;
color: ${(props) => props.theme.colors.primary};;

`