import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "./../../hooks/fetchHook";
import { useMessage } from "./../../hooks/messageHook";
import { AuthContext } from "./../../context/authContext";
export const AuthPage = () => {

  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useFetch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { email, password });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { email, password });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Links Shortener</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Email"
                  id="email"
                  type="email"
                  onChange={changeHandler}
                  name="email"
                  className="validate yellow-input"
                />
              </div>
              <div className="input-field ">
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  onChange={changeHandler}
                  name="password"
                  className=" validate yellow-input"
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
            <button className="btn grey lighten-1" onClick={registerHandler} disabled={loading}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
