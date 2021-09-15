import React from "react";

export default function App() {
  return (
    <>
      <h1>My Electron/React App</h1>
      <button
        onClick={(_) => electron.notificationApi.sendNotification("Hi there!")}
      >
        Notify
      </button>
    </>
  );
}
