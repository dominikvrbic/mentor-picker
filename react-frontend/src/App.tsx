import React, { useState } from "react";
import "./App.css";
import { useAsync } from "react-use";
import Api from "./api";
import { Spinner } from "./components/Spiner";
import { Main } from "./Main";

function App() {
  const init = async () => {
    try {
      //@ts-ignore

      const [loggedIn, user, loading] = await Api.get("/authStatus");
      setloadingState(loading);
      return { loggedIn, user, loading };
    } catch (error) {
      if (error.response.status === 401) {
        setloadingState(false);

        return { loading: false, loggedIn: false };
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };
  const logout = async () => {
    await Api.post("/logout", {});
    init();
  };
  const [loadingState, setloadingState] = useState(true);
  const { value } = useAsync(async () => init());

  return (
    <div className="App">
      {loadingState ? <Spinner /> : <Main value={value} />}
    </div>
  );
}

export default App;
