import React from "react";
import { Outlet } from "react-router-dom";

const Employee = () => {
  return (
    <div>
      {/* You can add an employee-specific header or navigation here */}
      <Outlet />
      {/* You can add an employee-specific footer here */}
    </div>
  );
};

export default Employee;
