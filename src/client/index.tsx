import React from "react";
import { createRoot } from "react-dom/client";
import "@elastic/eui/dist/eui_theme_dark.css";
import "@elastic/charts/dist/theme_dark.css";
import Notification_provider from "./components/Notification_provider";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import App from "./components/App";
import { EuiProvider } from "@elastic/eui";
import Restaurant_list from "./pages/restaurant/Restaurant_list";
import Product_details, {
  DUMMY_PRODUCT,
} from "./pages/product/Product_details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Restaurant_list />,
      },
    ],
  },
  {
    path: "product/:productId",
    element: <Product_details />,
    loader: async ({ params }) => {
      return DUMMY_PRODUCT;
    },
  },
]);

const root_element = document.getElementById("root");
if (!root_element) {
  throw new Error("Root element not found");
}

const root = createRoot(root_element);
root.render(
  <EuiProvider colorMode="dark">
    <Notification_provider>
      <RouterProvider router={router} />
    </Notification_provider>
  </EuiProvider>
);
