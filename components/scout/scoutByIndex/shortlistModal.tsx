import { Box, Modal } from "@mui/material";

interface IShortListModal {
  open: boolean;
  onClose: () => void;
}

const ShortListModal = ({ open, onClose }: IShortListModal) => {
  const blockDefaultClose = (
    e: React.MouseEvent,
    reason: "escapeKeyDown" | "backdropClick"
  ) => {
    /**
     * Block it by default
     */
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 3,
        }}
      >
        whatsup
      </Box>
    </Modal>
  );
};

export default ShortListModal;
