import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import type { SnackbarOrigin } from "@mui/material/Snackbar";

export interface ToastProps {
  open: boolean;
  message: string;
  duration?: number;
  position?: SnackbarOrigin;
  onClose: () => void;
  showCloseIcon?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  open,
  message,
  duration = 4000,
  position = { vertical: "bottom", horizontal: "center" },
  onClose,
  showCloseIcon = true,
}) => {
  const action = showCloseIcon ? (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  ) : null;

  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      message={message}
      action={action}
    />
  );
};

export default Toast;
