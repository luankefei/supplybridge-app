import { Box, Button, Modal, Stack, Zoom } from "@mui/material";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import { STextCaption, STextH2 } from "components/ui-components/text";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
  subTitle?: string;
  open: boolean;
  useDoubleConfirm?: boolean;
  onClose: (confirm: boolean) => void;
}

/**
 * A modal that asks for confirmation
 * Usage:
 * ```tsx
    <ConfirmModal
      useDoubleConfirm
      title={`Are you sure you want to delete this?`}
      subTitle="This action is irreversible."
      open={confirmDeleteId !== undefined}
      onClose={(confirmed) => {
        if (confirmed) {
          deletePermission(confirmDeleteId as number);
        }
        setConfirmDeleteId(undefined);
      }}
    />
  * ```
 *
 */
export default function ConfirmModal({
  title,
  subTitle,
  open,
  useDoubleConfirm,
  onClose,
}: IProps) {
  const { t } = useTranslation("translation");
  const [confirmTimes, setConfirmTimes] = useState(
    useDoubleConfirm === true ? 1 : 0
  );
  useEffect(() => {
    setConfirmTimes(useDoubleConfirm === true ? 1 : 0);
  }, [open]);

  const modalPos = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const actual = (
    <Zoom in={true} unmountOnExit>
      <Button color="error" onClick={() => onClose(true)}>
        {t("common.yes")}
      </Button>
    </Zoom>
  );
  const confirmBtn = () => {
    if (confirmTimes === 0) {
      return actual;
    }
    return (
      <Button color="error" onClick={() => setConfirmTimes(confirmTimes - 1)}>
        {t("common.imSure")}
      </Button>
    );
  };
  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box
        sx={{
          ...modalPos,
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <STextH2>{title}</STextH2>
        <SpacingVertical space="20px" />
        <STextCaption>{subTitle}</STextCaption>
        <SpacingVertical space="20px" />
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="outlined" onClick={() => onClose(false)}>
            {t("common.no")}
          </Button>
          <SpacingHorizontal space="8px" />
          {confirmBtn()}
        </Stack>
      </Box>
    </Modal>
  );
}
