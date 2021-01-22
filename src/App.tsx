import React, { useState, useEffect } from "react";
import ElectronWindow from "./utils/window";
import AppRouter from "./routes";
import { IpcRendererEvent } from "electron";
import { parseDeepLink } from "./utils/deeplink";
import { ParsedDeepLinkType } from "./types/deeplink";
import { CallRequestType } from "./types/models";

const App: React.FC = () => {
  const [deepLink, setDeepLink] = useState<ParsedDeepLinkType>();
  const [callRequest, setCallRequest] = useState<CallRequestType>();

  const onLinkReceived = (_event: IpcRendererEvent, link: string) => {
    const parsed = parseDeepLink(link);
    setDeepLink(parsed);
    localStorage.setItem("deepLink", JSON.stringify(parsed));
  };

  useEffect(() => {
    ElectronWindow.ipc.on("deep-link", onLinkReceived);
    ElectronWindow.ipc.send("ready-for-deep-link");
  }, []);

  return <AppRouter />;
};

export default App;
