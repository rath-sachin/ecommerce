import React from "react";
import { useAuth } from "../providers/auth.provider";

function Dashboard() {
  const { user } = useAuth();
  console.log(user);

  return <div>{user.name}</div>;
}

export default Dashboard;
