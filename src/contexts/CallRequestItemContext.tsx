import React from "react";
import { CallRequestType } from "../types/models";

type CallRequestItemContextType = {
  callRequest: CallRequestType,
  updateCallRequest: (callRequest: CallRequestType) => void;
};

const CallRequestItemContext = React.createContext<CallRequestItemContextType>(
  {} as CallRequestItemContextType
);

const CallRequestItemContextProvider: React.FC<CallRequestItemContextType> = (
  props
) => (
  <CallRequestItemContext.Provider value={props}>
    {props.children}
  </CallRequestItemContext.Provider>
);

export { CallRequestItemContextProvider, CallRequestItemContext };
