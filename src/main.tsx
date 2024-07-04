import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

// Styles
import "@/assets/scss/index.scss";

// Providers
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./stores/stores.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
