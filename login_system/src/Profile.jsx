import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./profile.css";
import LoginImage from "./assets/login.jpeg";
import Swal from "sweetalert2";

export async function profileData() {
  const res = await fetch("http://localhost:3001/profile", {
    credentials: "include",
  });

  return await res.json();
}
export default function Profile() {
  const [cookies, setCookie] = useCookies(["token"]);
  const userData = useLoaderData();
  const logout = () => {
    fetch("http://localhost:3001/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.message == "Disconnected") {
          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            position: "center",
          });
          window.location.href = "/";
        }
      });
  };
  return (
    <div>
      {userData.status == "Bad Request" ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <div className="profileInfo">
            <h1>Profile</h1>
            <p> Your Name: {userData.username}</p>
            <p>Your Email: {userData.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
          <div className="image">
            <img src={LoginImage} alt="" />
          </div>
        </>
      )}
    </div>
  );
}
