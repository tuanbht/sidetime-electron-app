import React, { useEffect, useCallback } from "react";
import ElectronWindow from "./utils/window";
import Layout from "./components/Layout";
import AppRouter from "./routes";
import useAppContext from "./hooks/useAppContext";
import { IpcRendererEvent } from "electron";
import { parseDeepLink } from "./utils/deeplink";

const App: React.FC = () => {
  const { authStore } = useAppContext();
  const onLinkReceived = useCallback(
    (_event: IpcRendererEvent, link: string) => {
      const parsed = parseDeepLink(link);
      if (parsed.token) authStore.login({ token: parsed.token });
    },
    [authStore]
  );

  useEffect(() => {
    ElectronWindow.ipc.on("deep-link", onLinkReceived);
    ElectronWindow.ipc.send("ready-for-deep-link");
  }, [onLinkReceived]);

  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default App;
