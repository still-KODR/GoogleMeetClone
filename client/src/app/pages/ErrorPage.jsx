import React from "react";
import { useRouteError } from "react-router";
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <h1>Error Page</h1>

      <p>{error.statusText}</p>
    </>
  );
};

export default ErrorPage;
