import React from "react";
import "./login.css";
import { useState } from "react";
import LoginImage from "./assets/login.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == "Bad Request") {
          await Swal.fire({
            position: "top-end",
            icon: "error",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            width: "100px",
            position: "center",
          });
          return;
        }
        console.log(data);
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
          width: "100px",
          position: "center",
        });
        window.location.href = "/profile";
      });
  };
  return (
    <>
      <div className="formContact">
        <h1>Login</h1>
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
                id="mailLogin"
                type="email"
                placeholder="Email address"
                value={inputs.email}
                name="email"
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <input
              className="formInput"
              id="password"
              type="text"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <p id="account">
              Don't have a account yet?{" "}
              <Link to="/register" id="registerNow">
                Register{" "}
              </Link>
              Now
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.6, delay: 0.1 }}
            >
              <button id="button" type="submit" value="Send">
                <p>Log In</p>
              </button>
            </motion.div>
          </form>
        </motion.div>
        <div className="image">
          <img src={Image} alt="" />
        </div>
      </div>
      <div className="image">
        <img id="large" src={LoginImage} alt="" />
      </div>
    </>
  );
}
