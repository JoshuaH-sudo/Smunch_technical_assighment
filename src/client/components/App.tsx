import React from "react";
import { FC } from "react";
import {
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
} from "@elastic/eui";
import { Outlet } from "react-router";
import Page_header from "./Page_header";

const App: FC = () => {
  return (
    <>
      <Page_header />
      <EuiHorizontalRule />
      <EuiPage data-testid="app_page" style={{ height: "100vh" }}>
        <EuiPageBody>
          <Outlet />
        </EuiPageBody>
      </EuiPage>
    </>
  );
};

export default App;
