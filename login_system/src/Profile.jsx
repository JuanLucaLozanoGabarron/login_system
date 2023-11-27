import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./profile.css";
import LoginImage from "./assets/login.jpeg";

export async function profileData() {
  const res = await fetch("http://localhost:3000/profile", {
    credentials: "include",
  });

  return await res.json();
}
export default function Profile() {
  const [cookies, setCookie] = useCookies(["token"]);
  const userData = useLoaderData();
  const logout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "Disconnected") {
          alert(data.message);
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
