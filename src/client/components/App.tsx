import React from "react";
import { FC } from "react";
import { EuiHeader, EuiPage, EuiPageBody } from "@elastic/eui";
import { Outlet } from "react-router";

const App: FC = () => {
  return (
    <>
      <EuiHeader title="Smunch Assignment App" />
      <EuiPage
        data-testid="app_page"
        style={{ height: "100vh" }}
      >
        <EuiPageBody>
          <Outlet />
        </EuiPageBody>
      </EuiPage>
    </>
  );
};

export default App;
