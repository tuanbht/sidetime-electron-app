import React from "react";
import RootStore from "../stores/RootStore";
import { RootStoreType } from "../types/stores/RootStore";

const AppContext = React.createContext<RootStoreType>({} as RootStoreType);
const AppContextProvider: React.FC = (props) => {
  const rootStore = new RootStore();
  return (
    <AppContext.Provider value={rootStore}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
