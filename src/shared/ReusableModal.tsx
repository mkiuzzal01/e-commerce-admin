import { Box, Modal, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";

type ReusableModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number | string;
};

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  children,
  width = 400,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="reusable-modal-title"
      aria-describedby="reusable-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          {title && (
            <Typography variant="h6" id="reusable-modal-title">
              {title}
            </Typography>
          )}
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box id="reusable-modal-description">{children}</Box>
      </Box>
    </Modal>
  );
};

export default ReusableModal;
