import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Cookies from "universal-cookie";
import Router from "next/router";
import Card from "../components/Card";
import { Flex } from "@chakra-ui/react";

const Profile = () => {
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("id")) {
      fetch(`http://localhost:3000/api/userData?email=${cookies.get("id")}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data[cookies.get("id")]);
        })
        .catch((err) => console.log(err));
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Flex
        flexDirection="column"
        width="100wh"
        height="88vh"
        bg="#1A202C"
        justifyContent="center"
        alignItems="center"
        boxShadow="#1A202C"
      >
        <Card
          key={1}
          product="Long Product"
          summary="Finalize them summary, hurry, we are close to deadline"
          longLine="Wow, this is very descriptive! I wonder how long it is"
        />
      </Flex>
    </>
  );
};

export default Profile;
