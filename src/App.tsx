import React, { useEffect, useCallback } from "react";
import ElectronWindow from "./utils/window";
import Layout from "./components/Layout";
import AppRouter from "./routes";
import useAppContext from "./hooks/useAppContext";
import { IpcRendererEvent } from "electron";
import { parseDeepLink } from "./utils/deeplink";
import { observer } from "mobx-react-lite";
import api from "./services/api";

const App: React.FC = () => {
  const { authStore, deeplinkStore, setIsLoading, isLoading, notificationStore } = useAppContext();
  const onLinkReceived = useCallback(
    async (_event: IpcRendererEvent, link: string) => {
      const parsed = parseDeepLink(link);

      if (!parsed.token) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);

      try {
        await authStore.logout();
        await deeplinkStore.setDeeplink(parsed);
        await authStore.signInWithToken(parsed.token);
      } catch (e) {
        notificationStore.setErrorNotification('Invalid token');
      }
      finally {
        setIsLoading(false);
      }
    },
    [authStore, deeplinkStore, notificationStore, setIsLoading],
  );

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  useEffect(() => {
    ElectronWindow.ipc.on("deep-link", onLinkReceived);
    ElectronWindow.ipc.send("ready-for-deep-link");
  }, [onLinkReceived]);

  useEffect(() => {
    api.applicationVersions.checkLatestVersion().catch((error) => {
      alert(
        error?.data?.message ||
          "Error while checking latest version from Sidetime app. Please restart again or download the latest version at https://sidetime.com/download-app.",
      );
    });
  }, []);

  if (isLoading) return null;
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default observer(App);
