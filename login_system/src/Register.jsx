import React from "react";
import "./register.css";
import { useState } from "react";
import LoginImage from "./assets/login.jpeg";
import { Link } from "react-router-dom";

export default function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(register),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "Bad Request") {
          alert(data.message);
          return;
        }
        alert(data.message);
        window.location.href = "/";
      });
  };
  return (
    <>
      <div className="formContact">
        <h1>Register</h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="info">
              <input
                className="formInput"
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={register.name}
                onChange={(e) =>
                  setRegister((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <input
                className="formInput"
                id="mail"
                name="email"
                type="email"
                placeholder="Email address"
                value={register.email}
                onChange={(e) =>
                  setRegister((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <input
              className="formInput"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={register.password}
              onChange={(e) =>
                setRegister((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <p id="account">
              You have a account?{" "}
              <Link to="/" id="registerNow">
                Log in{" "}
              </Link>
              Now
            </p>
            <button id="button" type="submit" value="Send">
              <p>Sign In</p>
            </button>
          </form>
        </div>
      </div>
      <div className="image">
        <img id="large" src={LoginImage} alt="" />
      </div>
    </>
  );
}
