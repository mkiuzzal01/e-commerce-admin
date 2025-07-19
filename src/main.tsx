import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { route } from "./route";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "./components/utils/tost-alert/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={route} />
        </PersistGate>
      </Provider>
    </ToastProvider>
  </StrictMode>
);
