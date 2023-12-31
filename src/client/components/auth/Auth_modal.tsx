import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiRadio,
} from "@elastic/eui";
import React, { FC, useState } from "react";
import { capitalize } from "../utils/tools";
import { create } from "../utils/api";

interface Auth_modal_props {
  close_modal: () => void;
}

const Auth_modal: FC<Auth_modal_props> = ({ close_modal }) => {
  const [mode, set_mode] = useState<"login" | "register">("login");
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [error_message, set_error_message] = useState<string>();
  const [is_loading, set_is_loading] = useState(false);

  const on_submit = async () => {
    let user_id: string;
    set_is_loading(true);
    try {
      if (mode === "login") {
        const response = await create<string>("auth/login", {
          data: {
            username,
            password,
          },
        });
        user_id = response.data;
      } else {
        const response = await create<string>("auth/register", {
          data: {
            username,
            password,
          },
        });
        user_id = response.data;
      }

      if (!user_id) throw "User id was not returned";
    } catch (error) {
      set_is_loading(false);
      return set_error_message(error as string);
    }

    localStorage.setItem("user_id", user_id);
    close_modal();
  };

  const mode_select = (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiRadio
          id="login_radio"
          label="Login"
          checked={mode === "login"}
          onChange={() => set_mode("login")}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiRadio
          id="register_radio"
          label="Register"
          checked={mode === "register"}
          onChange={() => set_mode("register")}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <EuiModal onClose={close_modal}>
      <EuiModalHeader>{capitalize(mode)}</EuiModalHeader>

      <EuiModalBody>
        <EuiForm error={error_message} isInvalid={!!error_message}>
          <EuiFormRow label="username">
            <EuiFieldText
              value={username}
              onChange={(event) => set_username(event.target.value)}
            />
          </EuiFormRow>
          <EuiFormRow label="password">
            <EuiFieldText
              type="password"
              value={password}
              onChange={(event) => set_password(event.target.value)}
            />
          </EuiFormRow>
          <EuiFormRow>{mode_select}</EuiFormRow>
        </EuiForm>
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButton isLoading={is_loading} onClick={on_submit}>
          Submit
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};

export default Auth_modal;
