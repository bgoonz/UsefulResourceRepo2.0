import React, { useState } from "react";
import Modal from "./shared/Modal";
import SettingsForm from "./SettingsForm";
import { useSettings } from "../context/SettingsProvider";

const SettingsModal = () => {
  const { settings, saveSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (settings) => {
    saveSettings(settings);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-sm btn-success mb-2"
      >
        Settings
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SettingsForm settings={settings} onSubmit={handleSave} />
      </Modal>
    </>
  );
};

export default SettingsModal;
