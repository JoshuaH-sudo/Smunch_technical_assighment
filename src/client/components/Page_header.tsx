import {
  EuiButtonIcon,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

const Page_header = () => {
  const navigate = useNavigate();
  return (
    <EuiHeader title="Smunch Assignment App">
      <EuiHeaderSection grow={false}>
        <EuiHeaderSectionItemButton iconType="home" onClick={() => navigate("/")}>
          <EuiTitle>
            <EuiText>Smunch Assignment</EuiText>
          </EuiTitle>
        </EuiHeaderSectionItemButton>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

export default Page_header;
