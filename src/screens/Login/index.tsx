import React, { useEffect } from "react";
import SideTimeLogo from "../../assets/logo.png";
import useAppContext from "../../hooks/useAppContext";
import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { schema, schemaValues } from "./form";
import { NOT_VALID_CREDENTIALS } from "../../constants/messages";
import {
  StyledContainer,
  FormContainer,
  FormFieldsContainer,
  Logo,
  sloganTypographyStyles,
  welcomeTypographyStyles,
  loginTypographyStyles,
  submitButtonStyles,
} from "./styles";

const LoginScreen: React.FC = () => {
  const { authStore, deeplinkStore } = useAppContext();
  const history = useHistory();

  const form = useFormik({
    enableReinitialize: false,
    initialValues: schemaValues,
    validationSchema: schema,
    onSubmit: (values) => {
      authStore
        .login(values)
        .catch(() => (form.errors.email = NOT_VALID_CREDENTIALS))
        .finally(() => form.setSubmitting(false));
    },
  });

  useEffect(() => {
    if (!authStore.checkLoggedInUser()) return;
    const { deeplink } = deeplinkStore;

    if (deeplink?.callRequestSlug && deeplink?.siteSlug) {
      history.push(`/${deeplink.siteSlug}/call_requests/${deeplink.callRequestSlug}`);
      deeplinkStore.clearDeeplink();
    } else history.push("/call_requests");
  }, [history, authStore, deeplinkStore, authStore.currentUser]);

  return (
    <StyledContainer>
      <Logo src={SideTimeLogo} />
      <Typography
        variant="bold"
        text="UNLOCKING 1-ON-1 EXPERTISE FOR ALL"
        css={sloganTypographyStyles}
      />
      <FormContainer>
        <Typography
          variant="bold"
          text="Welcome to Sidetime!"
          css={welcomeTypographyStyles}
        />
        <Typography
          variant="medium"
          text="Please sign in to continue."
          css={loginTypographyStyles}
        />
        <FormFieldsContainer>
          <Input
            label="Email"
            value={form.values.email || ""}
            error={form.errors.email || ""}
            onChange={(text) => form.setFieldValue("email", text)}
          />
          <Input
            label="Password"
            value={form.values.password || ""}
            error={form.errors.password || ""}
            onChange={(text) => form.setFieldValue("password", text)}
            secureText
          />
          <Button
            text="SIGN IN"
            isLoading={form.isSubmitting}
            onClick={form.handleSubmit}
            css={submitButtonStyles}
          />
        </FormFieldsContainer>
      </FormContainer>
    </StyledContainer>
  );
};

export default observer(LoginScreen);
