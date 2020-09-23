import React from "react";
import { Login } from "./Pages/Login";
import { ThemeForm } from "./Pages/ThemeForm";

export const Main = (props) => {
  const { loggedIn } = props;
  return <div>{!loggedIn ? <Login /> : <ThemeForm />}</div>;
};
