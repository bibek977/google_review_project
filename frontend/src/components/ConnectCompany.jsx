import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const ConnectCompany = () => {
  const companyConnect = async () => {
    try {
      const response = await axios.post("https://googlereview.up.railway.app/api/connect/", {
        link: "https://www.google.com/maps/place/KKFC/data=!4m7!3m6!1s0x39eb1900b656e389:0xc1571227b125368!8m2!3d27.6693444!4d85.3222281!16s%2Fg%2F11gy1p16x0!19sChIJieNWtgAZ6zkRaFMSeyJxFQw?authuser=0&hl=en&rclk=1",
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const {
    mutate: postConnectCompany,
    data: connectCompanyData,
    isPending: connectCompanyPending,
    isError: connectCompanyError,
  } = useMutation({
    mutationKey: ["connectCompany"],
    mutationFn: companyConnect,
  });
  const connectCompany = async () => {
    await postConnectCompany();
  };

  return (
    <>
      <button onClick={connectCompany}>Send Link</button>
    </>
  );
};

export default ConnectCompany;
