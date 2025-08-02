import { Box, Modal, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";

type ReusableModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  children,
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
          width: {
            xs: 300,
            md: 500,
          },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
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
