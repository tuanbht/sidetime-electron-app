import React, {
  useState,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";
import logoutIcon from "../../assets/logout.png";
import ActionMenuIcon from "./ActionMenuItem";
import { ActionsMenuPropsType } from "../../types/components/ActionsMenu";
import { StyledContainer } from "./styles";
import useAppContext from "../../hooks/useAppContext";

export interface ActionsMenuInterface {
  open: () => void;
  close: () => void;
}

const ActionsMenu: ForwardRefRenderFunction<
  ActionsMenuInterface,
  ActionsMenuPropsType
> = ({ css }, ref) => {
  const { authStore } = useAppContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setTimeout(() => setIsOpen(false), 200);
  }, []);

  useImperativeHandle(ref, () => {
    return { open, close };
  });

  if (!isOpen && !isHovering) return null;
  return (
    <StyledContainer
      css={css || ""}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ActionMenuIcon
        icon={logoutIcon}
        text="Logout"
        onClick={() => authStore.logout()}
      />
    </StyledContainer>
  );
};

export default React.forwardRef(ActionsMenu);
