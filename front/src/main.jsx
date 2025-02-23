import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./blocks/index.css";
import router from "./components/router";

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
