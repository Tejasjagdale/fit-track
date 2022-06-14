/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Cookies from "universal-cookie";
import Router from "next/router";
// import Card from "../components/Card";
import {
  Box,
  Image,
  Badge,
  Stack,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";

const DailyUpdate = () => {
  const cookies = new Cookies();
  const toast = useToast();

  let tDate = new Date();
  const [change, setchange] = useState(false);
  const [weight, setWeight] = useState('0.00');
  const [status, setstatus] = useState(false);
  const [wdata, setWdata] = useState({});
  const [wdate, setWdate] = useState(
    `${tDate.getDate()}/${tDate.getMonth() + 1}/${tDate.getFullYear()}`
  );

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

  useEffect(() => {
    let day = parseInt(wdate.split("/")[0]);
    let month = parseInt(wdate.split("/")[1]);
    let year = parseInt(wdate.split("/")[2]);

    function daysInMonth(month: number, year: number) {
      return new Date(year, month, 0).getDate();
    }

    cookies.get("id")
      ? fetch(
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
            let weights = data.weight_data.data_track;

            if (!weights[year]) {
              data.weight_data.data_track[year] = {};
              data.weight_data.data_track[year][month] = new Array(
                daysInMonth(month, year)
              ).fill(null);
            } else {
              if (!weights[year][month]) {
                data.weight_data.data_track[year][month] = new Array(
                  daysInMonth(month, year)
                ).fill(null);
              }
            }
            weights = data.weight_data.data_track;

            let cur_weight = weights[year][month][day - 1];
            setWdata(data.weight_data);
            if (cur_weight) {
              setWeight(`${cur_weight}`);
              setstatus(true);
            } else {
              setWeight('0');
              setstatus(false);
            }
          })
          .catch((err) => console.log(err))
      : "";
  }, [wdate, change]);

  const addWeight = (event: any) => {
    event.preventDefault();
    let updated_data: any = wdata;
    updated_data.data_track[parseInt(wdate.split("/")[2])][
      parseInt(wdate.split("/")[1])
    ][parseInt(wdate.split("/")[0]) - 1] = weight;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight_data: updated_data }),
    };
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${cookies.get(
        "userid"
      )}`,
      requestOptions
    ).then((res) => {
      if (res.status === 200) {
        toast({
          description: "Weight Added successfull",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setchange(!change);
      } else {
        toast({
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };

  return (
    <>
      <NavBar
        children={
          <Flex
            flexDirection="column"
            width="100wh"
            height="88vh"
            justifyContent="center"
            alignItems="center"
            background="#1E2225"
            overflowY="hidden"
            overflowX="hidden"
          >
            <Box w="300px" bg="#E7EEF1" mt={10} boxShadow="dark-lg">
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
                    <NumberInput
                      id="number"
                      bg="white"
                      defaultValue={"0"}
                      step={0.01}
                      onChange={(e) => setWeight(e)}
                      value={weight}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Choose the date of which Weight you want to enter
                    </FormLabel>
                    <DatePicker
                      placeholder="Choose Date"
                      name="date"
                      value={wdate}
                      isRequired={true}
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
        }
      />
    </>
  );
};

export default DailyUpdate;
