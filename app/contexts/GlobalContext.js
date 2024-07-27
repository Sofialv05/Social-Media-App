import React, { createContext, useState } from "react";

const GlobalStateContext = createContext({
  postId: "",
  setPostId: () => {},
});

const GlobalStateProvider = ({ children }) => {
  const [postId, setPostId] = useState("");

  return (
    <GlobalStateContext.Provider value={{ postId, setPostId }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
