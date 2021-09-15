import React, { useState, useContext } from "react";

const DEFAULT_SETTINGS = {
  theme: "light",
  fontSize: "17",
};

export const SettingsContext = React.createContext(DEFAULT_SETTINGS);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(getSettings());

  function getSettings() {
    const settings = localStorage.getItem("resource-settings");
    return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
  }

  function saveSettings(settings) {
    localStorage.setItem("resource-settings", JSON.stringify(settings));
    setSettings(settings);
  }

  const settingsApi = {
    settings,
    saveSettings,
  };

  return (
    <SettingsContext.Provider value={settingsApi}>
      {children(settings)}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

export default SettingsProvider;
