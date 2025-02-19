import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./blocks/index.css";
import router from "./components/router";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <RouterProvider router={router} />
  </>
  // </StrictMode>
);
