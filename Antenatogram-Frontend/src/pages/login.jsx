import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const LOGIN_URL = '/auth/signin';

const Login = () => {
  const { auth, setAuth } = useAuth();
  
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if(auth.loggedIn) navigate( auth.role == 'patient' ? '/user': '/patients');

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = auth.role;
    try {
      const result = await axios.post(LOGIN_URL, {
        "auth": { "role": role },
        "email": email,
        "password": pwd
      });
      setErrMsg("");
      setAuth({ ...auth, loggedIn: true, "accesstoken": result.data.accesstoken });
      if(result.data.pregnancyid) setAuth({...auth, "pregnancyid":result.data.pregnancyid});
      console.log(result.data);
      if (role == "patient") navigate('/user');
      else navigate("/patients");


    } catch (error) {
      // console.log(error);
      console.log("err"+ error);
      // setErrMsg(error.response.data.error);
    }

  };

  return (
    <section className="h-11/12 flex items-center justify-center">
      <div className="w-4/5 md:max-w-md  rounded-lg shadow-md p-6 space-y-6 bg-white">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
          {auth.role} login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            />
          </div>
          <p
            ref={errRef}
            className={errMsg ? "text-red-500" : "hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign In
          </button>
        </form>
        <p className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
          Forgot password?
        </p>
        <p className="text-sm font-light text-gray-500">
          {`Don't have an account?`} <br />
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <p onClick={() => { setAuth({ ...auth, role: auth.role == "doctor" ? "patient" : "doctor" }) }} className="text-sm font-light w-max  hover:cursor-pointer text-gray-500 hover:text-black">
          Are you a {auth.role == "doctor" ? "patient" : "doctor"}?<br />
        </p>
      </div>
    </section>
  );
};

export default Login;
