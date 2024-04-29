import { Card } from "@mui/material";
import React from "react";
import SliderContainer1 from "../containers/SliderContainer1";
import CompanyReview from "../components/CompanyReview";
import SliderContainer2 from "../containers/SliderContainer2";
import SliderContainer3 from "../containers/SliderContainer3";

const DesignTab = (props) => {
  const { data } = props;
  return (
    <div className="design-page">
      <Card sx={{ backgroundColor: "grey", padding: 2, marginBottom: 4 }}>
        <CompanyReview data={data} preview_id={1}></CompanyReview>
        <SliderContainer1 data={data}></SliderContainer1>
      </Card>
      <Card sx={{ backgroundColor: "grey", padding: 2, marginBottom: 4 }}>
        <CompanyReview data={data} preview_id={2}></CompanyReview>
        <SliderContainer2 data={data}></SliderContainer2>
      </Card>
      <Card sx={{ backgroundColor: "grey", padding: 2, marginBottom: 4 }}>
        <SliderContainer3
          company={data}
          data={data}
          preview_id={3}
        ></SliderContainer3>
      </Card>
    </div>
  );
};

export default DesignTab;
