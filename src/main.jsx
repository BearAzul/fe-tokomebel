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

registerSW();

AOS.init();
AOS.init({
  duration: 1200,
  once: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="913942463853-veha9ege0bsrqqu1gujhi8ptt7c65osu.apps.googleusercontent.com">
      <HelmetProvider>
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
      </HelmetProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
