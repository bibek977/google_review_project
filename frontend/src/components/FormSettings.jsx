import React, { useContext, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { SettingContext } from "../providers/SettingsProvider";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FormSettings = () => {
  const queryClient = useQueryClient();
  const { settings } = useContext(SettingContext);
  const { settings_data } = settings || {};
  const { align, rating, theme, ratingText, reviewDate, reviewName } =
    settings_data && settings_data.length > 0 ? settings_data[0] : {};

  const [settingsData, setSettingsData] = useState({
    align: align,
    rating: rating,
    theme: theme,
    ratingText: ratingText,
    reviewName: reviewName,
    reviewDate: reviewDate,
  });

  const resetForm = () => {
    setSettingsData({
      align: "center",
      rating: "1",
      theme: "light",
      ratingText: false,
      reviewName: false,
      reviewDate: false,
    });
  };

  const handleSettingsChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setSettingsData({
      ...settingsData,
      [name]: newValue,
    });
  };

  const postSettings = async () => {
    try {
      const response = await axios.patch(
        "https://googlereview.up.railway.app/settings/",
        settingsData
      );
    } catch (error) {
      console.error("Error while posting settings:", error);
    }
  };
  const { mutate: mutateSettings } = useMutation({
    mutationKey: ["mutateSettingsKey"],
    mutationFn: postSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchSettings"] });
    },
  });

  const handleFormChange = (event) => {
    event.preventDefault();
    mutateSettings();
  };

  return (
    <Container sx={{ padding: 2 }}>
      <form onSubmit={handleFormChange}>
        <Box sx={{ padding: 2, display: "flex", flexDirection: "row" }}>
          <Container sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div>
              <label htmlFor="selectAlign">Align</label>
              <select
                id="selectAlign"
                name="align"
                value={settingsData.align}
                onChange={handleSettingsChange}
              >
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
            </div>
            <div>
              <label htmlFor="selectTheme">Theme</label>
              <select
                id="selectTheme"
                name="theme"
                value={settingsData.theme}
                onChange={handleSettingsChange}
              >
                <option value="light">light</option>
                <option value="dark">dark</option>
              </select>
            </div>
            <div>
              <label htmlFor="selectRating">rating</label>
              <select
                id="selectRating"
                name="rating"
                value={settingsData.rating}
                onChange={handleSettingsChange}
              >
                <option value="1">All star</option>
                <option value="2">2 star</option>
                <option value="3">3 star</option>
                <option value="4">4 star</option>
                <option value="5">5 star</option>
              </select>
            </div>
          </Container>
          <Container sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div>
              <label htmlFor="subscribe">Hide Rating Text:</label>
              <input
                type="checkbox"
                id="ratingText"
                name="ratingText"
                checked={settingsData.ratingText}
                onChange={handleSettingsChange}
              />
            </div>
            <div>
              <label htmlFor="subscribe">Hide Reviews Name:</label>
              <input
                type="checkbox"
                id="reviewName"
                name="reviewName"
                checked={settingsData.reviewName}
                onChange={handleSettingsChange}
              />
            </div>
            <div>
              <label htmlFor="subscribe">Hide Review Date:</label>
              <input
                type="checkbox"
                id="reviewDate"
                name="reviewDate"
                checked={settingsData.reviewDate}
                onChange={handleSettingsChange}
              />
            </div>
          </Container>
        </Box>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            type="reset"
            variant="outlined"
            color="error"
            onClick={resetForm}
          >
            Reset
          </Button>
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default FormSettings;
