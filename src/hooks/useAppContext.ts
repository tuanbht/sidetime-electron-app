import React from "react";
import { AppContext } from "../contexts/AppContext";

const useAppContext = () => {
  return React.useContext(AppContext);
};

export default useAppContext;
