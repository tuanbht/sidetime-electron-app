import React from "react";
import HorizontalDivider from "../../../../../components/HorizontalDivider";
import Typography from "../../../../../components/Typography";
import Button from "../../../../../components/Button";
import useModalContext from "../../../../../hooks/useModalContext";
import window from "../../../../../utils/window";
import { X } from "react-feather";
import { RequestScreenshareModalPropsType } from "../../../../../types/screens/CallRequest";
import {
  doneButtonStyles,
  openPreferencesButtonStyles,
  ModalBodyContainer,
  ModalFooterContainer,
  ModalHeaderContainer,
  modalHeaderTypographyStyles,
  textTypographyStyles,
  StyledContainer,
  closeButtonIconStyles,
  doneButtonTextStyles,
  closeButtonStyles,
} from "./styles";

const RequestScreenshareModal: React.FC<RequestScreenshareModalPropsType> = ({
  onDone,
}) => {
  const modalContext = useModalContext();
  const onOpenPreferences = () => {
    window.ipc.send("open-screenshare-preferences");
  };

  return (
    <StyledContainer>
      <ModalHeaderContainer>
        <Typography
          variant="bold"
          text="Review System Access"
          css={modalHeaderTypographyStyles}
        />
        <Button
          icon={<X style={closeButtonIconStyles} />}
          onClick={() => modalContext.close()}
          css={closeButtonStyles}
        />
      </ModalHeaderContainer>
      <HorizontalDivider />
      <ModalBodyContainer>
        <Typography
          variant="regular"
          text="Sidetime requires Screen Recording access so remote users can see your screen."
          css={textTypographyStyles}
        />
        <Typography
          variant="regular"
          text="Please, open the Screen Recording Preferences and check Sidetime as a trusted application."
          css={textTypographyStyles}
        />
      </ModalBodyContainer>
      <ModalFooterContainer>
        <Button
          text="OPEN PREFERENCES"
          onClick={onOpenPreferences}
          css={openPreferencesButtonStyles}
        />
        <Button
          text="DONE"
          onClick={() => {
            onDone();
            modalContext.close();
          }}
          buttonTextCss={doneButtonTextStyles}
          css={doneButtonStyles}
        />
      </ModalFooterContainer>
    </StyledContainer>
  );
};

export default RequestScreenshareModal;
