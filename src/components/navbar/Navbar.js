import React from "react";
import axios from "axios";
import { TbLogout } from "react-icons/tb";

const Navbar = ({ username }) => {
  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      window.location.href = "/login";
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="h-14 pt-3">
      <div className="h-full grid justify-end mr-12">
        <div className="bg-white flex my-auto px-6 py-2 border-b-4 border-purple-900 shadow-lg rounded-full text-black text-sm font-semibold">
          <p className="mr-3">{username}</p>
          <button onClick={Logout} className="px-2">
            <TbLogout className="text-xl"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
