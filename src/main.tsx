import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { App as AntApp, ConfigProvider } from "antd";

// Styles
import "./index.css";

// Providers
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/stores.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AntApp>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </AntApp>
  </React.StrictMode>,
);
