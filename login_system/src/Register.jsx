import React from "react";
import "./register.css";
import { useState } from "react";
import LoginImage from "./assets/login.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        <motion.div
          className="form"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut", duration: 0.6 }}
        >
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.6, delay: 0.1 }}
            >
              <button id="button" type="submit" value="Send">
                <p>Sign In</p>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <div className="image">
        <img id="large" src={LoginImage} alt="" />
      </div>
    </>
  );
}
