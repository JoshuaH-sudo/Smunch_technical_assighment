import {
  EuiButtonIcon,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
} from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

const Page_header = () => {
  const navigate = useNavigate();
  return (
    <EuiHeader title="Smunch Assignment App">
      <EuiHeaderSection grow={false}>
        <EuiHeaderSectionItem border="right">
          <EuiButtonIcon
            iconType="home"
            display="fill"
            onClick={() => navigate("/")}
          />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

export default Page_header;
