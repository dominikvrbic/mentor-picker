import React from "react";
import spinner from "../assets/spinner.gif";

export const Spinner = () => (
  <>
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </>
);
