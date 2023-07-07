import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </>
);
