import { Outlet } from "react-router-dom";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import {
  Stack,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Paper,
} from "@mui/material";
import ProtectedRoute from "../route/protectedRoute";
import User from "./components/User";
// import Notification from "./components/Notification";
import { navigation } from "./navigation";
import logo from "../assets/logo.png";

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

const brand = {
  title: "Export corner",
  homeUrl: "/overview",
  logo: <img src={logo} alt="Export-corner" />,
};

const ToolbarActionsSearch = () => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <ThemeSwitcher />
    {/* <Notification /> */}
  </Stack>
);

const App = () => {
  return (
    <ProtectedRoute>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactRouterAppProvider navigation={navigation} branding={brand}>
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
