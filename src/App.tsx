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
  const { authStore, deeplinkStore, setIsLoading, isLoading } = useAppContext();
  const onLinkReceived = useCallback(
    async (_event: IpcRendererEvent, link: string) => {
      const parsed = parseDeepLink(link);

      if (!parsed.token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      await authStore.logout();
      await deeplinkStore.setDeeplink(parsed);
      await authStore.login({ token: parsed.token });
      setIsLoading(false);
    },
    [authStore, deeplinkStore, setIsLoading],
  );

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  useEffect(() => {
    ElectronWindow.ipc.on("deep-link", onLinkReceived);
    ElectronWindow.ipc.send("ready-for-deep-link");
  }, [onLinkReceived]);

  useEffect(() => {
    authStore.login({ token: authStore.currentUser?.token }).catch(() => {
      authStore.logout();
    });

    api.applicationVersions.checkLtestVersion().catch((error) => {
      alert(
        error?.data?.message ||
          "Error while checking latest version from Sidetime app. Please restart again",
      );
    });
  }, [authStore]);

  if (isLoading) return null;
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default observer(App);
