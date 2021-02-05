import React from "react";

type ModalContextType = {
  close: () => void;
};

type ModalContextProviderPropsType = {
  onModalClose: () => void;
};

const ModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
);
const ModalContextProvider: React.FC<ModalContextProviderPropsType> = (
  props
) => {
  const value = { close: props.onModalClose };
  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContextProvider, ModalContext };
