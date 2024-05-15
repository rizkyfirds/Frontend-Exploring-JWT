import React, { useState } from "react";
import axios from "axios";
import Inputfield from "../inputField/Inputfield";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");

  const isRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        name: name,
        email: email,
        password: password,
        confirmPassword: confPassword
      });
      window.location.href = '/login';
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  const signIn = async(e) => {
    e.preventDefault();
    window.location.href = '/login';
  }

  return (
    <div className="flex h-screen bg-purple-500">
      <div className="m-auto bg-slate-100 rounded-lg p-10 shadow-2xl shadow-purple-800">
        <div className="w-full grid gap-y-3">
          <p className="w-fit mx-auto mb-8 text-3xl font-bold">Register</p>
          <Inputfield type={"text"} field={"Name"} value={name} setData={setName} />
          <Inputfield type={"text"} field={"Email"} value={email} setData={setEmail} />
          <Inputfield type={"password"} field={"Password"} value={password} setData={setPassword} />
          <Inputfield type={"password"} field={"Confirm Password"} value={confPassword} setData={setConfPassword} />
          <p className="mt-5 font-normal text-red-600 text-base text-center">{msg}</p>
          <button className="drop-shadow-lg" onClick={isRegister}>
            <div className="bg-purple-400 rounded-full hover:bg-purple-900 hover:font-semibold">
              <p className="text-white p-2">Register</p>
            </div>
          </button>
          <div className="flex mx-auto">
            <p className="pr-1">or</p>
            <button onClick={signIn} className="text-red-600">sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
