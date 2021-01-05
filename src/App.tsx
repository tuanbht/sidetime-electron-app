import React, { useState, useEffect } from "react";
import ElectronWindow from "./utils/window";
import CallRequestListScreen from "./screens/CallRequest/List";
import CallRequestSessionScreen from "./screens/CallRequest/Session";
import HomeScreen from "./screens/Home";

import { IpcRendererEvent } from "electron";
import { parseDeepLink } from "./utils/deeplink";
import { ParsedDeepLink } from "./types/deeplink";
import { CallRequest } from "./types/models";

const App: React.FC = () => {
  const [deepLink, setDeepLink] = useState<ParsedDeepLink>();
  const [callRequest, setCallRequest] = useState<CallRequest>();

  const onCallRequestSelect = (cr: CallRequest) => setCallRequest(cr);
  const onCallRequestSessionEnd = () => {
    setCallRequest(undefined);
  };
  const onLinkReceived = (_event: IpcRendererEvent, link: string) => {
    const parsed = parseDeepLink(link);
    setDeepLink(parsed);
    localStorage.setItem("deepLink", JSON.stringify(parsed));
  };

  useEffect(() => {
    ElectronWindow.ipc.on("deep-link", onLinkReceived);
    ElectronWindow.ipc.send("ready-for-deep-link");
  }, []);

  if (callRequest)
    return (
      <CallRequestSessionScreen
        callRequest={callRequest}
        onCallRequestSessionEnd={onCallRequestSessionEnd}
      />
    );
  else if (
    deepLink?.protocol === "sidetime:" &&
    deepLink.action === "//call_requests"
  )
    return <CallRequestListScreen onCallRequestSelect={onCallRequestSelect} />;
  else return <HomeScreen />;
};

export default App;
