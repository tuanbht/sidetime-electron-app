import React, {
  useState,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";
import { ModalContextProvider } from "../../contexts/ModalContext";
import { StyledContainer } from "./styles";

export interface ModalInterface {
  open: () => void;
  close: () => void;
}

type ModalPropsType = {
  children: any;
};

const Modal: ForwardRefRenderFunction<ModalInterface, ModalPropsType> = (
  props,
  ref
): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useImperativeHandle(ref, () => {
    return { open, close };
  });

  if (!isOpen) return <></>;
  return (
    <StyledContainer>
      <ModalContextProvider onModalClose={close}>
        {props.children}
      </ModalContextProvider>
    </StyledContainer>
  );
};

export default React.forwardRef(Modal);
