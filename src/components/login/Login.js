import React, {useState} from "react";
import axios from "axios";
import Inputfield from "../inputField/Inputfield";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const isLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });
      window.location.href = '/';
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  const signUp = async(e) => {
    e.preventDefault();
    window.location.href = '/register';
  }


  return (
    <div className="flex h-screen bg-purple-500">
      <div className="m-auto bg-slate-100 rounded-lg p-10 shadow-2xl shadow-purple-800">
        <div className="w-full grid gap-y-3">
          <p className="w-fit mx-auto mb-8 text-3xl font-bold">Login</p>
          <Inputfield type={"text"} field={"Email"} value={email} setData={setEmail}/>
          <Inputfield type={"password"} field={"Password"} value={password} setData={setPassword}/>
          <p className="mt-5 font-normal text-red-600 text-base text-center">{msg}</p>
          <button className="drop-shadow-lg" onClick={isLogin}>
            <div className="bg-purple-500 rounded-full hover:bg-purple-900 hover:font-semibold">
              <p className="text-white p-2">Login</p>
            </div>
          </button>
          <div className="flex mx-auto">
            <p className="pr-1">or</p>
            <button onClick={signUp} className="text-red-600">sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
