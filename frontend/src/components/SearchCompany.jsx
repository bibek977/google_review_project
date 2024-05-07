import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SearchCompany = () => {
  const navigate = useNavigate();

  const initSettings = {
    align: "center",
    rating: "1",
    theme: "light",
    ratingText: false,
    reviewName: false,
    reviewDate: false,
  };
  const postSettings = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/settings/",
        initSettings
      );
    } catch (error) {
      console.error("Error while posting settings:", error);
    }
  };
  const initPreviewID = {
    preview_id: 1,
  };
  const previewID = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/settings/preview/",
        initPreviewID
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const [searchInput, setSearchInput] = useState({ title: "" });
  const [connectHref, setConnectHref] = useState({
    link: "",
  });
  const handleChangeInput = (event) => {
    setSearchInput({ title: event.target.value });
  };

  const searchCompany = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/search/",
        searchInput
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const {
    data: searchCompanyData,
    isPending: searchCompanyPending,
    isSuccess: searchCompanySuccess,
    mutate: searchCompanyMutate,
    isError: searchCompanyError,
  } = useMutation({
    mutationKey: ["postSearchCompany"],
    mutationFn: searchCompany,
  });

  const sendData = () => {
    searchCompanyMutate();
  };

  const companyConnect = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/connect/",
        connectHref
      );
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
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleConnectBtn = (href) => {
    setConnectHref({ link: href });
    previewID();
    postSettings();
    postConnectCompany();
  };

  return (
    <>
      <div className="search-main">
        <Card sx={{ margin: 2, padding: 2 }}>
          <div className="search-container">
            <CardHeader title="Search Company Name from Google Map"></CardHeader>
            <div className="search-box-container">
              <input
                type="text"
                className="search-box"
                value={searchInput.title}
                onChange={handleChangeInput}
              />
              <Button
                variant="contained"
                color="success"
                onClick={sendData}
                className="search-btn"
              >
                {searchCompanyPending ? (
                  "Searching..."
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>
        </Card>
        {connectCompanyPending ? (
          <Card sx={{ margin: 2 }}>
            <Alert
              severity="success"
              variant="filled"
              action={
                <Button color="inherit" size="small">
                  UNDO
                </Button>
              }
            >
              You are now scraping the google map reviews
            </Alert>
          </Card>
        ) : (
          ""
        )}
        <Container>
          {searchCompanyPending ? (
            <div className="search-skeleton">
              <Stack spacing={1}>
                <Skeleton variant="rounded" width={300} height={100}></Skeleton>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton
                  variant="rectangular"
                  width={300}
                  height={50}
                ></Skeleton>
                <Skeleton
                  variant="rectangular"
                  width={300}
                  height={50}
                ></Skeleton>
              </Stack>
              <Stack spacing={1}>
                <Skeleton variant="rounded" width={300} height={100}></Skeleton>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton
                  variant="rectangular"
                  width={300}
                  height={50}
                ></Skeleton>
                <Skeleton
                  variant="rectangular"
                  width={300}
                  height={50}
                ></Skeleton>
              </Stack>
            </div>
          ) : (
            <div className="search-results">
              {searchCompanyData?.map((e, i) => {
                return (
                  <div className="search-results-box" key={i}>
                    <div className="results-data-box">
                      <h1 className="results-title">{e.name}</h1>
                      <div className="results-reviews-box">
                        <h1>star: {e.rating}</h1>
                        <h1>reviews: {e.reviews}</h1>
                      </div>
                    </div>
                    <Button
                      variant="contained"
                      color="success"
                      className="connect-btn"
                      onClick={() => handleConnectBtn(e.href)}
                    >
                      Connect
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default SearchCompany;
