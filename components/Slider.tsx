/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
const fitnessCalculatorFunctions = require("fitness-calculator");

const Questions = () => {
  const toast = useToast();
  const [page, setpage] = useState(1);
  const [slide_val, setSlide_val] = useState(25);
  const [myCalorieNeeds, setCalorieNeeds] = useState(0);
  const [myMacrosNeeds, setMacrosNeeds] = useState<any>({});
  const [activity, setActivity] = useState<any>(null);
  const [wgoal, setWgoal] = useState<any>(null);
  const [level, setLevel] = useState<any>(null);
  const [fdate, setFdate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ghw, setGHW] = useState<any>({
    gender: null,
    height: null,
    weight: null,
    gweight: null,
    age: null,
  });

  const nextpage = () => {
    if (wgoal && page === 1) {
      setpage(2);
      setSlide_val(slide_val + 25);
    } else {
      if (
        page === 2 &&
        ghw.gender !== null &&
        ghw.height !== null &&
        ghw.weight !== null &&
        ghw.gweight !== null &&
        ghw.age !== null
      ) {
        setpage(3);
        setSlide_val(slide_val + 25);
      } else {
        if (page === 3 && activity !== null) {
          wgoal === "maintain" ? setpage(5) : setpage(4);
          wgoal === "maintain"
            ? setSlide_val(100)
            : setSlide_val(slide_val + 25);
        } else {
          if (page === 4 && level !== null) {
            setpage(5);
            setSlide_val(100);
          } else {
            toast({
              description: "Please Answer the Asked Questions! 🙏",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
        }
      }
    }
  };

  useEffect(() => {
    if (page === 5) {
      try {
        let wdiff = Math.abs(ghw.gweight - ghw.weight);

        let addDays = (days: number) => {
          var futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + days);
          return futureDate;
        };

        if (wgoal === "lose") {
          let val = level === 1 ? wdiff / 0.25 : wdiff / 0.5;
          setFdate(addDays(val * 7));
        }
        if (wgoal === "gain") {
          let val = level === 1 ? wdiff / 0.5 : wdiff / 1;
          setFdate(addDays(val * 7));
        }

        let cal = fitnessCalculatorFunctions.calorieNeeds(
          ghw.gender,
          parseInt(ghw.age),
          parseInt(ghw.height),
          parseInt(ghw.weight),
          activity
        );

        if (wgoal === "maintain") {
          setCalorieNeeds(cal.balance);
          setMacrosNeeds(
            fitnessCalculatorFunctions.macros(
              ghw.gender,
              parseInt(ghw.age),
              parseInt(ghw.height),
              parseInt(ghw.weight),
              activity,
              "balance"
            )
          );
        }
        if (wgoal === "lose") {
          level === 1
            ? setCalorieNeeds(cal.mildWeightLoss)
            : setCalorieNeeds(cal.heavyWeightLoss);

          level === 1
            ? setMacrosNeeds(
                fitnessCalculatorFunctions.macros(
                  ghw.gender,
                  parseInt(ghw.age),
                  parseInt(ghw.height),
                  parseInt(ghw.weight),
                  activity,
                  "mildWeightLoss"
                )
              )
            : setMacrosNeeds(
                fitnessCalculatorFunctions.macros(
                  ghw.gender,
                  parseInt(ghw.age),
                  parseInt(ghw.height),
                  parseInt(ghw.weight),
                  activity,
                  "heavyWeightLoss"
                )
              );
        }
        if (wgoal === "gain") {
          level === 1
            ? setCalorieNeeds(cal.mildWeightGain)
            : setCalorieNeeds(cal.heavyWeightGain);

          level === 1
            ? setMacrosNeeds(
                fitnessCalculatorFunctions.macros(
                  ghw.gender,
                  parseInt(ghw.age),
                  parseInt(ghw.height),
                  parseInt(ghw.weight),
                  activity,
                  "mildWeightGain"
                )
              )
            : setMacrosNeeds(
                fitnessCalculatorFunctions.macros(
                  ghw.gender,
                  parseInt(ghw.age),
                  parseInt(ghw.height),
                  parseInt(ghw.weight),
                  activity,
                  "heavyWeightGain"
                )
              );
        }
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const backpage = () => {
    page !== 1
      ? page === 5 && wgoal === "maintain"
        ? setpage(3)
        : setpage(page - 1)
      : "";
    page !== 1
      ? page === 5 && wgoal === "maintain"
        ? setSlide_val(75)
        : setSlide_val(slide_val - 25)
      : "";
  };

  const Page1 = (goal: string) => {
    setWgoal(goal);
  };

  const Page2 = (key: string, value: string) => {
    ghw[key] = value;
    setGHW(JSON.parse(JSON.stringify(ghw)));
  };

  const Page3 = (active: string) => {
    setActivity(active);
  };

  return (
    <Center width="100%" margin={2}>
      <Wrap
        width={{ md: "450px", sm: "100%" }}
        background="#191A1C"
        boxShadow="dark-lg"
      >
        <WrapItem width="100%">
          <Slider
            aria-label="slider-ex-1"
            value={slide_val}
            defaultValue={slide_val}
          >
            <SliderTrack height="15px" background="white">
              <SliderFilledTrack backgroundColor="teal" />
            </SliderTrack>
          </Slider>
        </WrapItem>

        <Wrap>
          {page === 1 ? (
            <>
              <Center p={5} w="100%">
                <Heading color="white" fontSize={20}>
                  What is your weight goal?
                </Heading>
              </Center>
              <Stack p="10" width="100%">
                <Stack
                  cursor="pointer"
                  width="100%"
                  color="white"
                  onClick={(_e) => {
                    Page1("lose");
                  }}
                >
                  <Center
                    p={5}
                    borderColor="#2C7A7B"
                    bg={wgoal === "lose" ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={wgoal === "lose" ? "white" : "black"}
                  >
                    <Heading fontSize={20}>Lose Weight</Heading>
                  </Center>
                </Stack>

                <Stack
                  width="100%"
                  color="white"
                  m={5}
                  cursor="pointer"
                  onClick={(_e) => {
                    Page1("maintain");
                  }}
                >
                  <Center
                    p={5}
                    borderColor="#2C7A7B"
                    bg={wgoal === "maintain" ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={wgoal === "maintain" ? "white" : "black"}
                  >
                    <Heading fontSize={20}>Maintain Weight</Heading>
                  </Center>
                </Stack>

                <Stack
                  width="100%"
                  color="white"
                  cursor="pointer"
                  m={5}
                  onClick={(_e) => {
                    Page1("gain");
                  }}
                >
                  <Center
                    p={5}
                    borderColor="#2C7A7B"
                    bg={wgoal === "gain" ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={wgoal === "gain" ? "white" : "black"}
                  >
                    <Heading fontSize={20}>Gain Weight</Heading>
                  </Center>
                </Stack>
              </Stack>
            </>
          ) : page === 2 ? (
            <>
              <Stack p={5} width="100%" spacing={2} color="white" m={2}>
                <Heading fontSize={20}>
                  Please select which sex we should use to calculate your
                  calorie needs.
                </Heading>
                <RadioGroup
                  onChange={(e) => {
                    Page2("gender", e);
                  }}
                  value={ghw.gender}
                >
                  <Stack direction="row">
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>

              <Stack p={5} width="100%" spacing={2} color="white" m={2}>
                <Heading fontSize={20}>What is your age?</Heading>
                <HStack>
                  <InputGroup w={{ md: "60%", sm: "100%" }}>
                    <InputLeftElement pointerEvents="none" fontSize="1.2em" />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Age (years)"
                      onChange={(e) => {
                        Page2("age", e.currentTarget.value);
                      }}
                      value={ghw.age}
                    />
                    <InputRightElement
                      children="yrs"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </Stack>

              <Stack p={5} width="100%" spacing={2} color="white" m={2}>
                <Heading fontSize={20}>How tall are you?</Heading>
                <HStack>
                  <InputGroup w={{ md: "60%", sm: "100%" }}>
                    <InputLeftElement pointerEvents="none" fontSize="1.2em" />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Height (centimeters)"
                      onChange={(e) => {
                        Page2("height", e.currentTarget.value);
                      }}
                      value={ghw.height}
                    />
                    <InputRightElement
                      children="cms"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </Stack>

              <Stack p={5} m={2} width="100%" spacing={2} color="white">
                <Heading fontSize={20}>How much do you weight?</Heading>
                <Text fontSize="md">
                  {"It's"} ok to estimate. Your can update later.
                </Text>
                <HStack>
                  <InputGroup w={{ md: "50%", sm: "100%" }}>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Current Weight"
                      onChange={(e) => {
                        Page2("weight", e.currentTarget.value);
                      }}
                      value={ghw.weight}
                    />
                    <InputRightElement
                      children="Kgs"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </Stack>

              <Stack p={5} width="100%" spacing={2} color="white" m={2}>
                <Heading fontSize={20}>{"What's "}your goal weight?</Heading>
                <Text fontSize="md">
                  {"Don't"} worry. this {"dosen't"} affect your daily calorie
                  goal and you can always change it later.
                </Text>
                <HStack>
                  <InputGroup w={{ md: "50%", sm: "100%" }}>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    />
                    <Input
                      color="black"
                      bg="white"
                      onChange={(e) => {
                        Page2("gweight", e.currentTarget.value);
                      }}
                      value={ghw.gweight}
                      placeholder="Goal Weight"
                    />
                    <InputRightElement
                      children="Kgs"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </Stack>
            </>
          ) : page === 3 ? (
            <>
              <WrapItem color="white">
                <Heading width="100%" textAlign="center" p={5} fontSize={23}>
                  What is your baseline activity level?
                </Heading>
              </WrapItem>
              <WrapItem width="100%">
                <Box>
                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    onClick={(_e) => {
                      Page3("sedentary");
                    }}
                    borderColor="#2C7A7B"
                    bg={activity === "sedentary" ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={activity === "sedentary" ? "white" : "black"}
                  >
                    <Heading fontSize={20}>Not Very Active</Heading>
                    <Text fontSize="md">
                      Spend Most of day Sitting (e.g.,bankteller,desk job)
                    </Text>
                  </Stack>

                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    onClick={(_e) => {
                      Page3("light");
                    }}
                    borderColor="#2C7A7B"
                    bg={activity === "light" ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={activity === "light" ? "white" : "black"}
                  >
                    <Heading fontSize={20}>Lightly Active</Heading>
                    <Text fontSize="md">
                      Spend a good part of the day doing some Physical activity
                      (e.g.,food server, postal carrier)
                    </Text>
                  </Stack>

                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    onClick={(_e) => {
                      Page3("moderate");
                    }}
                    borderColor="#2C7A7B"
                    bg={activity === "moderate" ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={activity === "moderate" ? "white" : "black"}
                  >
                    <Heading fontSize={20}>Active</Heading>
                    <Text fontSize="md">
                      Spend a good part of Day doing some physical activity
                      (e.g., food server,postal carrier)
                    </Text>
                  </Stack>

                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    onClick={(_e) => {
                      Page3("active");
                    }}
                    borderColor="#2C7A7B"
                    bg={activity === "active" ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={activity === "active" ? "white" : "black"}
                  >
                    <Heading fontSize={20}>Very Active</Heading>
                    <Text fontSize="md">
                      Spend a good part of the day doing heavy physical acitvity
                      (e.g., bike messenger , carpenter)
                    </Text>
                  </Stack>

                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    onClick={(_e) => {
                      Page3("extreme");
                    }}
                    borderColor="#2C7A7B"
                    bg={activity === "extreme" ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={activity === "extreme" ? "white" : "black"}
                  >
                    <Heading fontSize={20}>Extreme Active</Heading>
                    <Text fontSize="md">
                      Spend a good part of the day doing heavy physical acitvity
                      also extra fitness (e.g.,sports,gym)
                    </Text>
                  </Stack>
                </Box>
              </WrapItem>
            </>
          ) : page === 4 ? (
            <>
              <Heading
                p={4}
                textAlign="center"
                width="100%"
                color="white"
                fontSize={20}
              >
                What is your weekly goal?
              </Heading>
              <Text p={4} textAlign="center" width="100%" color="white">
                {"Let's"} break down your overall health goal into a weekly one
                you can maintain. Slow-and-steady is best!
              </Text>
              <Stack p="5" width="100%" cursor="pointer">
                <Stack width="100%" color="white">
                  <Center
                    p={5}
                    borderColor="#2C7A7B"
                    bg={level === 1 ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={level === 1 ? "white" : "black"}
                    onClick={(_e) => {
                      setLevel(1);
                    }}
                  >
                    <Heading textAlign="center" fontSize={20}>
                      {wgoal === "lose"
                        ? "Lose 0.5 Kilogram per week (Recommended)"
                        : "Gain 0.25 Kilogram per week (Recommended)"}
                    </Heading>
                  </Center>
                </Stack>

                <Stack width="100%" color="white" cursor="pointer">
                  <Center
                    p={5}
                    onClick={(_e) => {
                      setLevel(2);
                    }}
                    borderColor="#2C7A7B"
                    bg={level === 2 ? "#2C7A7B" : "white"}
                    _hover={{ borderWidth: "5px" }}
                    color={level === 2 ? "white" : "black"}
                  >
                    <Heading textAlign="center" fontSize={20}>
                      {wgoal === "lose"
                        ? "Lose 1 Kilogram per week"
                        : "Gain 0.5 Kilogram per week"}
                    </Heading>
                  </Center>
                </Stack>
              </Stack>
            </>
          ) : (
            <>
              <Heading p={4} textAlign="center" width="100%" color="white">
                Congratulations!
              </Heading>
              <Text p={4} textAlign="center" width="100%" color="white">
                Your daily net calorie goal is:
              </Text>
              <Heading
                textAlign="center"
                width="100%"
                color="white"
                fontSize={70}
              >
                {Math.round(myCalorieNeeds)}
              </Heading>
              <Text textAlign="center" width="100%" color="white">
                calories
              </Text>
              <Text textAlign="center" width="100%" color="white">
                With this plan, you should:
              </Text>
              <Heading
                fontSize={20}
                textAlign="center"
                width="100%"
                color="white"
                pl="30"
                pr="30"
              >
                {wgoal === "lose"
                  ? `Lose weight by ${
                      level === 1 ? "0.5" : "1"
                    } KG pre week and reach ${ghw.gweight} Kg by ${
                      String(fdate.getDate()).padStart(2, "0") +
                      "/" +
                      String(fdate.getMonth() + 1).padStart(2, "0") +
                      "/" +
                      fdate.getFullYear()
                    }`
                  : ""}
                {wgoal === "gain"
                  ? `Gain weight by ${
                      level === 1 ? "0.25" : "0.5"
                    } Kg pre week and reach ${ghw.gweight} Kg by ${
                      String(fdate.getDate()).padStart(2, "0") +
                      "/" +
                      String(fdate.getMonth() + 1).padStart(2, "0") +
                      "/" +
                      fdate.getFullYear()
                    }`
                  : ""}
                {wgoal === "maintain" ? "Maintain your current weight" : ""}
              </Heading>
              <Flex p={4} justifyContent="center" width="100%">
                <Button
                  bg="#319795"
                  color="white"
                  _hover={{ bg: "#319795" }}
                  onClick={(_e) => {
                    toast({
                      description:
                        "Sorry This Feature is not Avaliable for now 😢",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                      position: "top",
                    });
                  }}
                >
                  Start With Daily calories Tracking
                </Button>
              </Flex>
              <Flex justifyContent="center" width="100%">
                <Button
                  bg="red.500"
                  color="white"
                  _hover={{ bg: "red.500" }}
                  onClick={onOpen}
                >
                  Macros!
                </Button>
              </Flex>
            </>
          )}
        </Wrap>

        <WrapItem width="100%" p={3}>
          <Button
            colorScheme="teal"
            variant="outline"
            mr={5}
            disabled={page <= 1 ? true : false}
            onClick={backpage}
          >
            Back
          </Button>
          <Button
            colorScheme="teal"
            disabled={page >= 5 ? true : false}
            variant="solid"
            onClick={nextpage}
          >
            Next
          </Button>
        </WrapItem>

        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap
                  height="400px"
                  overflowX="hidden"
                  overflowY="scroll"
                  w="100%"
                >
                  {Object.keys(myMacrosNeeds).map((key) => (
                    <WrapItem w="100%" mt={3} display="block" key={key}>
                      <Heading mt={3} mb={1} w="100%" fontSize={20}>
                        {key}
                      </Heading>
                      <VStack w="100%">
                        {Object.keys(myMacrosNeeds[key]).map((key1) => (
                          <Flex w="100%" key={key1}>
                            <Text>{key1} :</Text>
                            <Text> {myMacrosNeeds[key][key1]}</Text>
                          </Flex>
                        ))}
                      </VStack>
                    </WrapItem>
                  ))}
                </Wrap>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      </Wrap>
    </Center>
  );
};

export default Questions;
