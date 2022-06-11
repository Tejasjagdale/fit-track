/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Cookies from "universal-cookie";
import Router from "next/router";
import Card from "../components/Card";
import { Flex } from "@chakra-ui/react";

const Profile = () => {
  const cookies = new Cookies();
  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    height: "",
    age: "",
    dob: "",
  });

  useEffect(() => {
    if (cookies.get("id")) {
      fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${cookies.get(
          "userid"
        )}`,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("jwt"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          function getAge(dateString: string | number | Date) {
            let var1: any = new Date();
            let var2: any = new Date(dateString);
            var ageInMilliseconds = var1 - var2;
            return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
          }
          setUserData({
            name: data.username,
            email: data.email,
            height: data.height,
            age: getAge(data.dob),
            dob: data.dob,
          });
        })
        .catch((err) => console.log(err));
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <>
    {console.log(userData)}
      <NavBar
        children={
          <Flex
            flexDirection="column"
            width="100wh"
            height="88vh"
            bg="#1E2225"
            justifyContent="center"
            alignItems="center"
          >
            <Card data={userData} />
          </Flex>
        }
      />
    </>
  );
};

export default Profile;
