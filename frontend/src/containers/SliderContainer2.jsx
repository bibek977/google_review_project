import React from "react";
import ReviewCard from "../components/ReviewCard";
import PreviewCard from "../components/PreviewCard";

const SliderContainer2 = (props) => {
  const { data, preview } = props;
  return (
    <div className="custom-scrollbar border-0">
      <div className="scroll-content">
        <div className="row">
          {preview
            ? data?.map((e, i) => {
                return (
                  <div className="slider-two" key={i}>
                    <PreviewCard data={e}></PreviewCard>
                  </div>
                );
              })
            : data.reviews?.map((e, i) => {
                return (
                  <div className="slider-two" key={i}>
                    <ReviewCard data={e}></ReviewCard>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default SliderContainer2;
