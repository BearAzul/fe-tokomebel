import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AOS from "aos";
import "aos/dist/aos.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import ButtonTop from "./common/ButtonTop/ButtonTop.jsx";
import { ToastContainer } from "react-toastify";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { registerSW } from "virtual:pwa-register";
import MaintenancePage from "./pages/maintenance/MaintenancePage.jsx";

registerSW();

AOS.init();
AOS.init({
  duration: 1200,
  once: true,
});

const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === "true";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      {isMaintenance ? (
        <MaintenancePage />
      ) : (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Provider store={store}>
            <ToastContainer
              position="bottom-right"
              autoClose={3400}
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="dark"
            />
            <App />
            <ButtonTop />
          </Provider>
        </GoogleOAuthProvider>
      )}
    </HelmetProvider>
  </React.StrictMode>
);
