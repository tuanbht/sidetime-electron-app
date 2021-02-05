import React from "react";
import { ModalContext } from "../contexts/ModalContext";

const useModalContext = () => {
  return React.useContext(ModalContext);
};

export default useModalContext;
