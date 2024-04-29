import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MainTab from "../tabs/MainTab";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const getCompanyData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/");
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const {
    data: companyData,
    isError: companyDataError,
    isLoading: companyDataLoading,
  } = useQuery({
    queryKey: ["fetchCompanyData"],
    queryFn: getCompanyData,
  });

  if (companyDataLoading) {
    return <div className="loading-tag">Loading...</div>;
  }

  if (companyDataError) {
    return <div className="loading-tag">Error fetching data </div>;
  }

  return (
    <>
      {companyData && companyData.company.length !== 0 ? (
        <MainTab data={companyData}></MainTab>
      ) : (
        <div className="loading-tag">
          <h1>
            no data go to search url
          </h1>
          <Button sx={{marginLeft:4}} variant="contained" color="primary" onClick={()=>navigate("/search")}>Search</Button>
        </div>
      )}
    </>
  );
};

export default Home;
