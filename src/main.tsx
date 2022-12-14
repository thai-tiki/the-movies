import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import App from "./App";
import "./index.css";
import { routes } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App>
    <RouterProvider router={routes} />
  </App>
);
