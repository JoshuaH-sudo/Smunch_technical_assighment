import React from "react";
import { FC } from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
import "@elastic/charts/dist/theme_dark.css";
import {
  EuiPage,
  EuiPageBody,
  EuiPageSection,
  EuiPanel,
  EuiProvider,
} from "@elastic/eui";
import Notification_provider from "./Notification_provider";

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <Notification_provider>
        <EuiPage data-testid="app_page" style={{ height: "100vh" }}>
          <EuiPageBody>
            <EuiPageSection grow={true}>Hello World</EuiPageSection>
          </EuiPageBody>
        </EuiPage>
      </Notification_provider>
    </EuiProvider>
  );
};

export default App;
