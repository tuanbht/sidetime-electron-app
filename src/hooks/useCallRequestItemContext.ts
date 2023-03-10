import React from "react";
import { CallRequestItemContext } from "../contexts/CallRequestItemContext";

const useCallRequestItemContext = () => React.useContext(CallRequestItemContext);

export default useCallRequestItemContext;
