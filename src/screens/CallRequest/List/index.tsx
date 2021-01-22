import React, { useState, useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";
import api from "../../../services/api";

import { useHistory } from "react-router-dom";
import { CallRequestType } from "../../../types/models";
import { CallRequestListScreenPropsType } from "../../../types/screens/CallRequest";
import { StyledContainer } from "./styles";

const CallRequestListScreen: React.FC<CallRequestListScreenPropsType> = (
  props
) => {
  const { authStore } = useAppContext();
  const history = useHistory();
  const [callRequests, setCallRequests] = useState<CallRequestType[]>();

  const onCallSelect = (call: CallRequestType) => {
    if (!props.onCallRequestSelect) return;
    props.onCallRequestSelect(call);
  };

  useEffect(() => {
    api.callRequests
      .index()
      .then((response) => {
        setCallRequests(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StyledContainer>
      <button
        onClick={() => {
          authStore.logout();
          history.push("/");
        }}
      >
        Logout
      </button>
      <h1>Call Requests</h1>
      {callRequests ? (
        <ul>
          {callRequests.map((callRequest) => (
            <li>
              {callRequest.call_type}
              <button onClick={() => onCallSelect(callRequest)}>Join</button>
            </li>
          ))}
        </ul>
      ) : (
        <h1>Loading...</h1>
      )}
    </StyledContainer>
  );
};

export default CallRequestListScreen;
