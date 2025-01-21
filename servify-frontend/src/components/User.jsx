import React from "react";
import { Outlet } from "react-router-dom";

const User = () => {
  return (
    <div>
      {/* You can add a header or navigation here */}
      <Outlet />
      {/* You can add a footer here */}
    </div>
  );
};

export default User;
