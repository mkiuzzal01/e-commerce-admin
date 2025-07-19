import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FC,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";
import type { SnackbarOrigin } from "@mui/material/Snackbar";

type ToastOptions = {
  message: string;
  type?: AlertColor; // 'success' | 'error' | 'warning' | 'info'
  duration?: number;
  position?: SnackbarOrigin;
};

type ToastContextType = {
  showToast: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertColor>("info");
  const [duration, setDuration] = useState(4000);
  const [position, setPosition] = useState<SnackbarOrigin>({
    vertical: "bottom",
    horizontal: "center",
  });

  const showToast = ({
    message,
    type = "info",
    duration = 4000,
    position,
  }: ToastOptions) => {
    setMessage(message);
    setType(type);
    setDuration(duration);
    if (position) setPosition(position);
    setOpen(true);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={position}
      >
        <MuiAlert
          onClose={handleClose}
          severity={type}
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
