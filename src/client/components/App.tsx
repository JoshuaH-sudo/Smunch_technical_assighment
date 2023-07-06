import React from "react";
import { FC } from "react";
import { EuiPage, EuiPageBody } from "@elastic/eui";
import { Outlet } from "react-router";
const App: FC = () => {
  return (
    <EuiPage data-testid="app_page" style={{ height: "100vh" }}>
      <EuiPageBody>
        <Outlet />
      </EuiPageBody>
    </EuiPage>
  );
};

export default App;
