import React from "react";
import FormSettings from "../components/FormSettings";
import PreviewReview from "../components/PreviewReview";
import { Card, Container } from "@mui/material";

const SettingsTab = (props) => {
  const { data } = props;
  return (
    <div className="settings-tab">
      <FormSettings></FormSettings>

      <Container sx={{ marginTop: 5 }}>
        <PreviewReview data={data}></PreviewReview>
      </Container>
    </div>
  );
};

export default SettingsTab;
