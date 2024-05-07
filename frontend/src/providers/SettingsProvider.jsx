import React, { createContext, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const SettingContext = createContext();

export const SettingsProvider = ({ children }) => {
  const getSettings = async () => {
    try {
      const response = await axios.get("https://google-review.up.railway.app/settings/");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: settings } = useQuery({
    queryKey: ["fetchSettings"],
    queryFn: getSettings,
  });

  return (
    <SettingContext.Provider value={{ settings }}>
      {children}
    </SettingContext.Provider>
  );
};
