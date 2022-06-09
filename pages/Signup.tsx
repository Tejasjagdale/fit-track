import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  Link,
  FormControl,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Header from "../components/Header";
import { DatePicker } from "chakra-ui-date-input";
import Link1 from "next/link";
import { GiBodyHeight } from "react-icons/gi";
import Cookies from "universal-cookie";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Router from "next/router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [height, setheight] = useState("");
  const [pass, setpass] = useState("");
  const [DOB, setDOB] = useState("");
  const cookies = new Cookies();

  const handleShowClick = () => setShowPassword(!showPassword);

  const SignUp = (event: any) => {
    event.preventDefault();
    let Height:number =  parseInt(height)
    let bmi_range = [19*(Height/100)*(Height/100),25*(Height/100)*(Height/100)]

    let fdob:string = `${DOB.split("/")[2]}-${DOB.split("/")[1]}-${DOB.split("/")[0]}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: pass,
        username: name,
        age: age,
        height: height,
        dob: fdob,
        weight_data: {
          bmi_range: bmi_range,
          data_track: {},
        },
      }),
    };

    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
      requestOptions
    ).then(async (res:any) =>{ 
      if (res.status === 200) {
        toast({
          description: "Registration successfull",
          status: "success",
          duration: 3000,
          isClosable: true,
          position:'top'
        });
        let data = await res.json();
        cookies.set("id", email, { path: "/" });
        cookies.set("jwt", data.jwt , { path: "/" });
        cookies.set("userid", data.user.id , { path: "/" });
        console.log(cookies.get("id"));
        Router.push("/dailyUpdate");
      } else {
        toast({
          description: "Registration Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position:'top'
        });
      }
      })
  };

  return (
    <>
      <Header />
      <Flex
        flexDirection="column"
        width="100wh"
        height="88vh"
        bg="#1A202C"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar backgroundColor="#2DCEAA" />
          <Heading color="white">Welcome To FIT-TRACK</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents={"none"}>
                      <CFaUserAlt color="black" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      value={email}
                      required
                      placeholder="Email Address"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents={"none"} color={"black"}>
                      <CFaLock color="black" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Choose Password"
                      value={pass}
                      required
                      onChange={(e) => {
                        setpass(e.target.value);
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <DatePicker
                    placeholder="Date of Birth"
                    name="date"
                    value={DOB}
                    isRequired={true}
                    onChange={(date) => setDOB(date)}
                  />
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdDriveFileRenameOutline color="black" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                      value={name}
                      required
                      placeholder="Enter UserName"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="black" />
                    </InputLeftElement>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setage(e.target.value);
                      }}
                      value={age}
                      required
                      placeholder="Enter Age"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <GiBodyHeight color="black" />
                    </InputLeftElement>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setheight(e.target.value);
                      }}
                      value={height}
                      required
                      placeholder="Enter Height"
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  backgroundColor="black"
                  color="white"
                  colorScheme="blackAlpha"
                  width="full"
                  onClick={SignUp}
                >
                  SignUp
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box color="white">
          Already Signed up?
          <Link1 href="/" passHref>
            <Link>Login</Link>
          </Link1>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
