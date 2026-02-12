import React, { useState } from "react";
import Footer from "./Footer";
import useServiceRequests from "../hooks/useServiceRequests";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import EmployeeHeader from "./EmployeeHeader";

const EmployeeDashboard = () => {
  const [requestStatus, setRequestStatus] = useState("pending");

  const [activeTab, setActiveTab] = useState("requests");

  const { getServiceRequests, serviceRequests } =
    useServiceRequests(requestStatus);

  if (!serviceRequests) return;

  const { pending, confirmed, completed } = serviceRequests;

  const handleAccept = async (id) => {
    await axiosInstance
      .post(`https://servify-backend-bvwf.onrender.com/employee/accept-order/${id}/`)
      .then((response) => {
        console.log(response.data);
        setRequestStatus("confirmed");
        toast.success("Order Accepted!");
        getServiceRequests();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!");
      });
  };

  const handleReject = async (id) => {
    await axiosInstance
      .post(`https://servify-backend-bvwf.onrender.com/employee/reject-order/${id}/`)
      .then((response) => {
        console.log(response.data);
        setRequestStatus("rejected");
        toast.success("Order Rejected!");
        getServiceRequests();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!");
      });
  };

  const handleComplete = async (id) => {
    await axiosInstance
      .post(`https://servify-backend-bvwf.onrender.com/employee/mark-completed/${id}/`)
      .then((response) => {
        console.log(response.data);
        setRequestStatus("completed");
        toast.success("Order Completed!");
        getServiceRequests();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!");
      });
  };

  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "pending":
          return "bg-yellow-500";
        case "confirmed":
          return "bg-blue-500";
        case "completed":
          return "bg-green-500";
        default:
          return "bg-gray-500";
      }
    };

    return (
      <span
        className={`${getStatusColor(
          status
        )} text-white px-2 py-1 rounded-full text-xs font-bold`}
      >
        {status}
      </span>
    );
  };

  const ServiceTable = ({ data }) => (
    <div className="overflow-x-auto overflow-y-auto max-h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Service ID</th>
            <th className="p-3 text-left">Customer ID</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.service}</td>
              <td className="p-3">{item.user}</td>
              <td className="p-3">
                <StatusBadge status={item.status} />
              </td>
              <td className="p-3">{new Date(item.date).toLocaleString()}</td>
              {item.status === "pending" && (
                <td className="p-4">
                  {" "}
                  <div className="flex gap-x-2">
                    {" "}
                    <button
                      className="bg-green-500 border border-green-500 py-2 px-5 rounded-lg text-white font-semibold transition-all duration-100 hover:bg-green-400"
                      onClick={() => handleAccept(item.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 border border-red-500 py-2 px-5 rounded-lg text-white font-semibold transition-all duration-100 hover:bg-red-400"
                      onClick={() => handleReject(item.id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              )}
              {item.status === "confirmed" && (
                <td className="p-4">
                  {" "}
                  <div className="flex gap-x-2">
                    {" "}
                    <button
                      className="bg-blue-500 border border-blue-500 py-2 px-5 rounded-lg text-white font-semibold transition-all duration-100 hover:bg-blue-400"
                      onClick={() => handleComplete(item.id)}
                    >
                      Complete
                    </button>
                  </div>
                </td>
              )}
              {item.status === "completed" && <td className="p-3">---</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const SummaryCard = ({ title, value }) => (
    <div className="bg-white rounded-lg p-5 shadow-md text-center flex-1 m-2">
      <h3 className="text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const RecentActivities = ({ activities }) => (
    <div className="bg-white rounded-lg p-5 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Recent Activities
      </h2>
      <ul className="space-y-3 overflow-y-auto max-h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {activities.map((activity) => (
          <li key={activity.id} className="border-b border-gray-200 pb-2">
            <p className="text-gray-600">Service ID : {activity.service}</p>
            <small className="text-gray-400">Status : {activity.status}</small>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full">
      <EmployeeHeader />
      <div className="w-10/12 mx-auto font-sans rounded-lg px-6 pt-44">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Employee Dashboard
        </h1>

        <div className="flex flex-wrap justify-between mb-6">
          <SummaryCard title="Total Requests" value={pending.length} />
          <SummaryCard title="In Progress" value={confirmed.length} />
          <SummaryCard title="Completed" value={completed.length} />
        </div>

        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex-1 py-2 px-4 rounded-tl-lg rounded-bl-lg ${
              activeTab === "requests"
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Service Requests
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 px-4 rounded-tr-lg rounded-br-lg ${
              activeTab === "history"
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Service History
          </button>
        </div>

        <div className="bg-white rounded-lg p-5 mb-6 shadow-md">
          {activeTab === "requests" && (
            <ServiceTable data={[...pending, ...confirmed]} />
          )}
          {activeTab === "history" && <ServiceTable data={completed} />}
        </div>

        <RecentActivities activities={completed} />
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeDashboard;
