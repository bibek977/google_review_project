import React, { useState } from "react";
import PreviewTab from "./PreviewTab";
import SettingsTab from "./SettingsTab";
import DesignTab from "./DesignTab";
import { Container } from "@mui/material";

const MainTab = (props) => {
  const { data } = props;

  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    setActiveTab("tab3");
  };

  return (
    <Container>
      <div className="tabs">
        <ul className="nav">
          <li
            className={activeTab === "tab1" ? "active" : ""}
            onClick={handleTab1}
          >
            Preview
          </li>
          <li
            className={activeTab === "tab2" ? "active" : ""}
            onClick={handleTab2}
          >
            Design
          </li>
          <li
            className={activeTab === "tab3" ? "active" : ""}
            onClick={handleTab3}
          >
            Settings
          </li>
        </ul>
        <div className="outlet">
          {activeTab === "tab1" ? (
            <PreviewTab data={data}></PreviewTab>
          ) : activeTab === "tab2" ? (
            <DesignTab data={data}></DesignTab>
          ) : (
            <SettingsTab data={data}></SettingsTab>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MainTab;
