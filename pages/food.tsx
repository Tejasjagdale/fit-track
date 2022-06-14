/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import Router from "next/router";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../components/NavBar";
import Questions from "../components/Slider";

const food = () => {
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("id") || cookies.get("userid") || cookies.get("jwt")) {
      fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${cookies.get(
          "userid"
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("");
        })
        .catch((err) => console.log(err));
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <NavBar
      // eslint-disable-next-line react/no-children-prop
      children={
        <>
          <Questions />
        </>
      }
    />
  );
};

export default food;
