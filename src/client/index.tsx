import React from "react";
import { createRoot } from "react-dom/client";
import "@elastic/eui/dist/eui_theme_dark.css";
import "@elastic/charts/dist/theme_dark.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import { EuiProvider } from "@elastic/eui";
import Restaurant_list from "./components/pages/restaurant/Restaurant_list";
import { get } from "./components/utils/api";
import Product_details from "./components/pages/product/Product_details";
import Notification_provider from "./components/utils/Notification_provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Restaurant_list />,
      },
      {
        path: "product_page/:product_id",
        element: <Product_details />,
        loader: async ({ params }) => {
          const response = await get(`product/${params.product_id}`);

          return response.data;
        },
      },
    ],
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
