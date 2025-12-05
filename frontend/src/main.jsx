import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dashboard", element: <App /> },
  { path: "*", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
