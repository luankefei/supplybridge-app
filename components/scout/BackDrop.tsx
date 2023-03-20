import * as React from "react";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Icon from "components/Icon";
import useStore from "hooks/useStore";

interface Props {
  isOpen: boolean;
}

export default function BackDrop({ isOpen = false }: Props) {
  const { setShowBackdrop } = useStore();

  const handleClose = () => {
    setShowBackdrop(false);
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <Container onClick={handleClose}>
      <Icon src="backdrop-logo" width={82} height={82} />
      <CustomizedTypography id="modal-modal-description" sx={{ mt: 2 }}>
        No results matching to this search
        <br />
        Our SmartBridge Artificial Intelligence will process the request
      </CustomizedTypography>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 360px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    top: 400px;
  }
  bottom: 0px;
  backdrop-filter: blur(1.5rem);
  z-index: 1300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
`;

const CustomizedTypography = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: ${(props) => props.theme.colors.secondary}; ;
`;
