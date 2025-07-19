import { Outlet } from "react-router-dom";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import {
  IconButton,
  Stack,
  TextField,
  Tooltip,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Paper,
} from "@mui/material";
import { SearchIcon } from "lucide-react";
import ProtectedRoute from "../route/protectedRoute";
import User from "./components/User";
import Notification from "./components/Notification";
import { navigation } from "./Navigation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#facc15",
    },
    background: {
      default: "#f9fafb",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const branding = {
  title: "EnterpriseX",
  homeUrl: "/overview",
  logo: "",
};

const ToolbarActionsSearch = () => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Tooltip title="Search" enterDelay={1000}>
      <IconButton
        type="button"
        aria-label="Open search"
        sx={{ display: { xs: "inline", md: "none" } }}
      >
        <SearchIcon size={20} />
      </IconButton>
    </Tooltip>

    <TextField
      label="Search"
      variant="outlined"
      size="small"
      sx={{ display: { xs: "none", md: "inline-flex" }, mr: 1 }}
      InputProps={{
        endAdornment: (
          <IconButton type="button" aria-label="Search" size="small">
            <SearchIcon size={18} />
          </IconButton>
        ),
      }}
    />

    <ThemeSwitcher />
    <Notification />
  </Stack>
);

const App = () => {
  return (
    <ProtectedRoute>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactRouterAppProvider navigation={navigation} branding={branding}>
          <DashboardLayout
            slots={{
              toolbarActions: ToolbarActionsSearch,
              toolbarAccount: User,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "95%",
                marginX: "auto",
                marginTop: "2px",
              }}
            >
              <Outlet />
            </Paper>
          </DashboardLayout>
        </ReactRouterAppProvider>
      </ThemeProvider>
    </ProtectedRoute>
  );
};

export default App;
