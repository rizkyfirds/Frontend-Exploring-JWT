import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../navbar/Navbar";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expireToken, setExpireToken] = useState("");
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      console.log("first");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpireToken(decoded.exp);
    } catch (error) {
      if (error.response) {
        window.location.href = "/login";
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expireToken * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.name);
        setExpireToken(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDataUsers(response.data);
  };

  return (
    <div className="h-screen bg-purple-500">
      <Navbar username={name} />
      <div className="mt-14">
        {dataUsers.length == 0 && dataUsers ? (
          <div className="flex ">
            <button
              className="mx-auto p-5 bg-white rounded-full shadow-xl shadow-purple-800 font-semibold"
              onClick={getUsers}
            >
              SEE ALL USERS!!
            </button>
          </div>
        ) : (
          ""
        )}
        {dataUsers.length > 0 && dataUsers ? (
          <div className="mx-auto w-3/4 bg-white p-4 rounded-2xl shadow-2xl shadow-purple-800">
            <p className="text-lg py-4 text-center font-bold">
              All Data Users Registered
            </p>
            <table className="w-full rounded-xl">
              <thead className="font-semibold">
                <tr className="border-b-4 border-purple-700">
                  <th className="w-1/5">No</th>
                  <th className="w-2/5">Name</th>
                  <th className="w-2/5">Email</th>
                </tr>
              </thead>
              <tbody>
                {dataUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dashboard;
