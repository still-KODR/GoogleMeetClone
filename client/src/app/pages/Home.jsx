import React from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1>Welcome {user.name}</h1>

      <button>Create Room</button>
    </>
  );
};

export default Home;
