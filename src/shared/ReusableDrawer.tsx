import {
  Drawer,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { ReactNode } from "react";

type ReusableDrawerProps = {
  open: boolean;
  onClose: () => boolean;
  title?: string | ReactNode;
  anchor?: "left" | "right" | "top" | "bottom";
  width?: number | string;
  children: ReactNode;
};

const ReusableDrawer = ({
  open,
  onClose,
  title,
  anchor = "right",
  width = "30%",
  children,
}: ReusableDrawerProps) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      sx={{
        zIndex: theme.zIndex.drawer + 5,
        "& .MuiDrawer-paper": {
          width: isSmDown ? "80%" : width,
          p: 2,
          zIndex: theme.zIndex.modal + 5,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        {title ? (
          typeof title === "string" ? (
            <Typography variant="h6">{title}</Typography>
          ) : (
            title
          )
        ) : (
          <span />
        )}

        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ overflowY: "auto" }}>{children}</Box>
    </Drawer>
  );
};

export default ReusableDrawer;
