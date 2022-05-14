import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Cookies from "universal-cookie";
import Router from "next/router";
import Card from "../components/Card";
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  useColorMode,
  Button,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";

const DailyUpdate = () => {
  const cookies = new Cookies();
  const toast = useToast()

  let tDate = new Date();
  const [weight, setWeight] = useState("");
  const [userdata, setUserData] = useState();
  const [status, setstatus] = useState(false);
  const [wdate, setWdate] = useState(
    `${tDate.getDate()}/${tDate.getMonth() + 1}/${tDate.getFullYear()}`
  );

  useEffect(() => {
    if (cookies.get("id")) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/userData?email=${cookies.get("id")}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data[cookies.get("id")]);
        })
        .catch((err) => console.log(err));
    } else {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/addWeight?email=${cookies.get("id")}&date=${wdate}`
    )
      .then((response) => response.json())
      .then((data) => {
        if(data.msg){
          setWeight(data.weight)
        }else{
          setWeight("")
        }
        setstatus(data.msg);
      })
      .catch((err) => console.log(err));
  }, [wdate]);

  const addWeight = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cookies.get(
          "id"
        ),
        weight: weight,
        date:wdate
      }),
    };
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/addWeight`, requestOptions).then((res) => {
      if (res.status === 200) {
        toast({
          description: "Weight Added successfull",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setWeight("")
        setWdate(`${tDate.getDate()}/${tDate.getMonth() + 1}/${tDate.getFullYear()}`)
      } else {
        toast({
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

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
        <Box w="300px" bg="#E7EEF1" mt={10}>
          <Image
            src="https://images-platform.99static.com/3CzoydPCp5pXI83EODhEOibNLmk=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/93/93858/attachment_93858260"
            alt="Card Image"
            boxSize="250px"
            width="300px"
          ></Image>
          <Box p={5}>
            <Stack align="center" mb={5}>
              <Badge
                variant="solid"
                colorScheme={status ? "green" : "red"}
                rounded="full"
                px={2}
              >
                {status ? "Weight Entered" : "Weight Not Entered"}
              </Badge>
            </Stack>

            <Stack align="center">
              <FormControl>
                <FormLabel>Enter your todays weight in KGs</FormLabel>
                <Input
                  id="number"
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  value={weight}
                  required
                  bg="white"
                  type="number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Choose the date of which Weight you want to enter
                </FormLabel>
                <DatePicker
                  placeholder="Choose Date"
                  name="date"
                  value={wdate}
                  required
                  onChange={(date) => setWdate(date)}
                />
              </FormControl>
              <Button
                onClick={addWeight}
                variant="solid"
                colorScheme={status ? "blue" : "green"}
                size="md"
                mt={10}
                width="full"
              >
                {status ? "Update Weight" : "Enter Weight"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default DailyUpdate;
