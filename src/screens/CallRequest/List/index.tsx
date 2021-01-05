import React, { useState, useEffect } from "react";
import api from "../../../services/api";

import { CallRequest } from "../../../types/models";
import { CallRequestListScreenProps } from "../../../types/screens/CallRequest";
import { StyledContainer } from "./styles";

const CallRequestListScreen: React.FC<CallRequestListScreenProps> = (props) => {
  const [callRequests, setCallRequests] = useState<CallRequest[]>();

  const onCallSelect = (call: CallRequest) => {
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
