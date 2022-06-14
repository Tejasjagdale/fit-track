/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  WrapItem,
  Wrap,
  HStack,
  Tag,
  TagLabel,
  FormControl,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  Tooltip,
  useToast,
  Center,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { AiFillTag, AiOutlineBarcode } from "react-icons/ai";
import Cookies from "universal-cookie";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Router from "next/router";

const addworkout = () => {
  const cookies = new Cookies();
  let [playlist, setPlaylist] = useState<any>([]);
  let [fplaylist, setFplaylist] = useState<any>([]);
  const [tab2, settab2] = useState<boolean>(true);
  const [tab1, settab1] = useState<boolean>(true);
  const [update, setUpdate] = useState<any>([]);
  const [schedule, setSchedule] = useState<any>({});
  const [tags, setTags] = useState([]);
  const [ftags, setFtags] = useState(["all"]);
  const [day, setDay] = useState("");
  const [data, setData] = useState<any>({
    tag: "",
    sets: 1,
    reps: 5,
    code: "",
    weight: 0,
  });
  const toast = useToast();


  const delete_pcard = (pcard_index: any) => {
    playlist.splice(pcard_index, 1);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule: schedule, playlist: playlist }),
    };
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${cookies.get(
        "userid"
      )}`,
      requestOptions
    ).then((res) => {
      if (res.status === 200) {
        toast({
          description: "Your PlayList was updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        fetch_data();
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

  const delete_scard = (day: any, scard_index: any) => {
    if (schedule[day].length !== 1) {
      schedule[day].splice(scard_index, 1);
    } else {
      schedule[day] = [];
    }
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule: schedule, playlist: playlist }),
    };
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${cookies.get(
        "userid"
      )}`,
      requestOptions
    ).then((res) => {
      if (res.status === 200) {
        toast({
          description: "Your PlayList was updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        fetch_data();
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

  const edit_pcard = (pcard_index: any) => {
    setData(playlist[pcard_index]);
    setUpdate([parseInt(pcard_index)]);
    settab2(false);
  };

  const edit_scard = (day: any, scard_index: any) => {
    setData(schedule[day][scard_index]);
    setUpdate([day, parseInt(scard_index)]);
    settab1(false);
  };

  const start_exc = () => {};

  const fetch_data = () => {
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
        let stags: any = new Set(["all"]);
        setSchedule(data.schedule);
        setPlaylist(data.playlist);
        setFplaylist(data.playlist);
        setUpdate([]);
        data.playlist.map((exc: any) => {
          stags.add(exc.tag);
        });
        stags = Array.from(stags);
        setTags(stags);
      });
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const update_exc = (type: any) => {
    if (data.tag !== "" && data.code !== "") {
      fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exercises?filters[slug]=${data.code}`
      )
        .then((res) => res.json())
        .then((data2) => {
          if (data2.meta.pagination.pageCount !== 0) {
            data.exc_name = data2.data[0].attributes.exc_name;
            data.Main_Muscle_Worked =
              data2.data[0].attributes.Main_Muscle_Worked;
            data.Equipment = data2.data[0].attributes.Equipment;

            if (type.type === "playlist") {
              if (update.length === 0) {
                playlist = [...playlist, data];
              } else {
                playlist[update[0]] = data;
              }
              const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  schedule: schedule,
                  playlist: playlist,
                }),
              };
              fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${cookies.get(
                  "userid"
                )}`,
                requestOptions
              ).then((res) => {
                if (res.status === 200) {
                  toast({
                    description: "Your PlayList was updated successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                  setData({
                    tag: "",
                    sets: 1,
                    reps: 5,
                    code: "",
                    weight: 0,
                  });
                  fetch_data();
                } else {
                  toast({
                    description: "Something went wrong",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                  setData({
                    tag: "",
                    sets: 1,
                    reps: 5,
                    code: "",
                    weight: 0,
                  });
                }
              });
            } else {
              if (update.length === 0) {
                schedule[day.toLowerCase()] = [
                  ...schedule[day.toLowerCase()],
                  data,
                ];
              } else {
                schedule[update[0]][parseInt(update[1])] = data;
              }

              const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  schedule: schedule,
                  playlist: playlist,
                }),
              };
              fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${cookies.get(
                  "userid"
                )}`,
                requestOptions
              ).then((res) => {
                if (res.status === 200) {
                  toast({
                    description: `Exercise was added to ${day} schedule!`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                  setData({
                    tag: "",
                    sets: 1,
                    reps: 5,
                    code: "",
                    weight: 0,
                  });
                  fetch_data();
                } else {
                  toast({
                    description: "Something went wrong",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                  setData({
                    tag: "",
                    sets: 1,
                    reps: 5,
                    code: "",
                    weight: 0,
                  });
                }
              });
            }
          } else {
            toast({
              description:
                "Your Exercise code didn't matched in database found!😔",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          }
        });
    } else {
      toast({
        description: "Please Enter the values in input feild🙏",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const upt_value = (key: any, value: any) => {
    data[key] = value;
    setData(JSON.parse(JSON.stringify(data)));
  };

  const Schedule = () => {
    return (
      <>
        <Wrap>
          {[
            ["red.500", "MONDAY"],
            ["blue.500", "TUESDAY"],
            ["orange.500", "WEDNESDAY"],
            ["pink.500", "THURSDAY"],
            ["#319795", "FRIDAY"],
            ["yellow.500", "SATURDAY"],
            ["green.500", "SUNDAY"],
          ].map((data, index) => (
            <WrapItem width={{ md: "400px", sm: "100%" }} key={index}>
              <Box
                p={4}
                display={{ md: "flex" }}
                width="100%"
                borderWidth={1}
                bgGradient={`linear(to-tr, ${data[0]}, #191A1C)`}
                color="white"
              >
                <Accordion width="100%" defaultIndex={[0]} allowMultiple>
                  <AccordionItem width="100%">
                    <Heading width="100%">
                      <AccordionButton>
                        <Box width="100%" flex="1" textAlign="left">
                          {data[1]}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                      <Text width="100%" mb={3}>
                        Muscel Targeted:
                      </Text>
                      <HStack width="100%" mb={3} spacing={4}>
                        <Tag
                          size="md"
                          borderRadius="full"
                          variant="solid"
                          bg="white"
                          color="black"
                        >
                          <TagLabel>Forearms</TagLabel>
                        </Tag>
                      </HStack>

                      <Wrap maxW="100%">
                        <Heading width="100%" fontSize={20}>
                          Exercises
                        </Heading>

                        <WrapItem
                          w="280px"
                          h="250px"
                          mt={-6}
                          mx={-6}
                          mb={6}
                          pos={"relative"}
                        >
                          <Carousel
                            width="280px"
                            infiniteLoop
                            showThumbs={false}
                          >
                            {schedule[data[1].toLowerCase()]
                              ? schedule[data[1].toLowerCase()].map(
                                  (exc: any, index: any) => (
                                    <>
                                      <Wrap
                                        display={{ md: "flex", sm: "block" }}
                                        w={{ md: "300px", sm: "280px" }}
                                        bg="#191A1C"
                                        color="white"
                                        p={4}
                                        h="250px"
                                      >
                                        <Stack w="280px">
                                          <Heading fontSize={20}>
                                            {exc.exc_name}
                                          </Heading>
                                          <Wrap>
                                            <Text mr={1}>
                                              Muscle Targeted :
                                            </Text>
                                            <Tag
                                              fontSize={"14"}
                                              borderRadius="full"
                                              variant="solid"
                                              bg="#9933FF"
                                            >
                                              <TagLabel>
                                                <Link
                                                  href={`${process.env.NEXT_PUBLIC_URL}/exercise/muscle/${exc.Main_Muscle_Worked}`}
                                                  passHref
                                                >
                                                  {exc.Main_Muscle_Worked}
                                                </Link>
                                              </TagLabel>
                                            </Tag>
                                          </Wrap>

                                          <Wrap>
                                            <Text mr={1}>Equipment Type :</Text>
                                            <Tag
                                              fontSize={"14"}
                                              borderRadius="full"
                                              variant="solid"
                                              bg="blue.500"
                                            >
                                              <TagLabel>
                                                <Link
                                                  href={`${process.env.NEXT_PUBLIC_URL}/exercise/equipment/${exc.Equipment}`}
                                                  passHref
                                                >
                                                  {exc.Equipment}
                                                </Link>
                                              </TagLabel>
                                            </Tag>
                                          </Wrap>

                                          <Wrap w="100%">
                                            <WrapItem flex="1">
                                              <Center p={2}>
                                                <Text>{exc.weight} kg</Text>
                                              </Center>
                                            </WrapItem>
                                            <WrapItem flex="1">
                                              <Center p={2}>
                                                <Text>{exc.reps} reps</Text>
                                              </Center>
                                            </WrapItem>
                                            <WrapItem flex="1">
                                              <Center p={2}>
                                                <Text>{exc.sets} sets</Text>
                                              </Center>
                                            </WrapItem>
                                          </Wrap>

                                          <HStack>
                                            <Button
                                              colorScheme="green"
                                              onClick={(e) => {
                                                start_exc;
                                              }}
                                            >
                                              Start
                                            </Button>
                                            <Button
                                              colorScheme="teal"
                                              onClick={(e) => {
                                                edit_scard(
                                                  data[1].toLowerCase(),
                                                  index
                                                );
                                              }}
                                            >
                                              Edit
                                            </Button>
                                            <Button
                                              colorScheme="red"
                                              onClick={(e) => {
                                                delete_scard(
                                                  data[1].toLowerCase(),
                                                  index
                                                );
                                              }}
                                            >
                                              Delete
                                            </Button>
                                          </HStack>
                                        </Stack>
                                      </Wrap>
                                    </>
                                  )
                                )
                              : ""}
                            <Flex
                              w={{ md: "300px", sm: "280px" }}
                              h="250px"
                              bg="#191A1C"
                              color="white"
                              boxShadow="dark-lg"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Tooltip
                                hasArrow
                                color="white"
                                bg="green.500"
                                fontSize="md"
                                label="Add new Exercise"
                              >
                                <Button
                                  bg="white"
                                  color="green.500"
                                  _hover={{ bg: "green.500", color: "white" }}
                                  onClick={(e) => {
                                    setDay(data[1]);
                                    settab1(false);
                                  }}
                                >
                                  <AddIcon />
                                </Button>
                              </Tooltip>
                            </Flex>
                          </Carousel>
                        </WrapItem>
                      </Wrap>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </>
    );
  };

  const filter_playlist = (value: any) => {
    let temp_tags = playlist.filter(
      (exc: any) => exc.tag === value || value === "all"
    );
    let temp_tag = tags.filter((tag) => tag === value);
    setFtags(temp_tag);
    setFplaylist(temp_tags);
  };

  const exc_playlist = () => {
    return (
      <>
        <Wrap spacing={5}>
          <HStack width="100%" color="white" fontSize={20}>
            {tags.map((tag) => (
              <Button
                bg={ftags[0] === tag ? "white" : "#191A1C"}
                color={ftags[0] === tag ? "#191A1C" : "white"}
                key={tag}
                _hover={{ bg: "grey", color: "#191A1C" }}
                onClick={() => {
                  filter_playlist(tag);
                }}
              >
                {tag}
              </Button>
            ))}
          </HStack>

          {fplaylist.map((exc: any, index: number) => (
            <>
              <Wrap
                display={{ md: "flex", sm: "block" }}
                w="300px"
                h="275px"
                bg="#191A1C"
                color="white"
                boxShadow="dark-lg"
                p={8}
              >
                <Stack w="100%">
                  <Heading width="100%" fontSize={20}>
                    {exc.exc_name}
                  </Heading>
                  <Wrap>
                    <Text mr={1}>Muscle Targeted :</Text>
                    <Tag
                      fontSize={"14"}
                      borderRadius="full"
                      variant="solid"
                      bg="#9933FF"
                    >
                      <TagLabel>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_URL}/exercise/muscle/${exc.Main_Muscle_Worked}`}
                          passHref
                        >
                          {exc.Main_Muscle_Worked}
                        </Link>
                      </TagLabel>
                    </Tag>
                  </Wrap>

                  <Wrap>
                    <Text mr={1}>Equipment Type :</Text>
                    <Tag
                      fontSize={"14"}
                      borderRadius="full"
                      variant="solid"
                      bg="blue.500"
                    >
                      <TagLabel>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_URL}/exercise/equipment/${exc.Equipment}`}
                          passHref
                        >
                          {exc.Equipment}
                        </Link>
                      </TagLabel>
                    </Tag>
                  </Wrap>

                  <Wrap w="100%" m={3}>
                    <WrapItem flex="1">
                      <Center p={2}>
                        <Text>{exc.weight} kg</Text>
                      </Center>
                    </WrapItem>
                    <WrapItem flex="1">
                      <Center p={2}>
                        <Text>{exc.reps} reps</Text>
                      </Center>
                    </WrapItem>
                    <WrapItem flex="1">
                      <Center p={2}>
                        <Text>{exc.sets} sets</Text>
                      </Center>
                    </WrapItem>
                  </Wrap>

                  <HStack>
                    <Button
                      colorScheme="green"
                      onClick={(e) => {
                        start_exc;
                      }}
                    >
                      Start
                    </Button>
                    <Button
                      colorScheme="teal"
                      onClick={(e) => {
                        edit_pcard(index);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={(e) => {
                        delete_pcard(index);
                      }}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Stack>
              </Wrap>
            </>
          ))}

          <Flex
            w="300px"
            h="275px"
            bg="#191A1C"
            color="white"
            boxShadow="dark-lg"
            justifyContent="center"
            alignItems="center"
          >
            <Tooltip
              hasArrow
              color="white"
              bg="green.500"
              fontSize="md"
              label="Add new Exercise"
            >
              <Button
                bg="white"
                color="green.500"
                _hover={{ bg: "green.500", color: "white" }}
                onClick={(e) => {
                  settab2(false);
                }}
              >
                <AddIcon />
              </Button>
            </Tooltip>
          </Flex>
        </Wrap>
      </>
    );
  };

  const Header = (type: any) => {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Button
            size="sm"
            padding="0"
            mr={3}
            bg="white"
            onClick={(e) => {
              settab1(true);
              settab2(true);
            }}
            color="#319795"
          >
            <ArrowBackIcon />
          </Button>
          <Heading size="md" letterSpacing={"tighter"}>
            Add Workout
          </Heading>
        </Flex>

        <Box mt={{ base: 4, md: 0 }}>
          <Button
            variant="outline"
            _hover={{
              bg: "white",
              color: "#319795",
              borderColor: "teal.700",
            }}
            onClick={(e) => {
              update_exc(type);
            }}
          >
            {update.length === 0 ? "Add Workout" : "Update Exercise"}
          </Button>
        </Box>
      </Flex>
    );
  };

  const Body = (type: any) => {
    return (
      <>
        <Header type={type} />
        <Flex
          align="center"
          justify="space-between"
          wrap="wrap"
          padding={6}
          color="white"
        >
          <Wrap width="100%">
            <WrapItem w="48%" m={5}>
              <FormControl>
                <Text mb="8px">Tag Name</Text>
                <HStack>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" fontSize="1.2em" />
                    <Input
                      color="black"
                      key="f1"
                      bg="white"
                      placeholder="Enter Tag Name"
                      onChange={(e) => {
                        upt_value("tag", e.currentTarget.value);
                      }}
                      value={data.tag}
                    />
                    <InputRightElement
                      children={<AiFillTag />}
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </FormControl>
            </WrapItem>

            <WrapItem w="48%" m={5}>
              <FormControl>
                <Text mb="8px">Exercise Code</Text>
                <HStack w="100%">
                  <InputGroup w="100%">
                    <InputLeftElement pointerEvents="none" fontSize="1.2em" />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Enter Exercise Code"
                      value={data.code}
                      key="f2"
                      onChange={(e) => {
                        upt_value("code", e.currentTarget.value);
                      }}
                    />
                    <InputRightElement
                      children={<AiOutlineBarcode />}
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </FormControl>
            </WrapItem>

            <WrapItem w="48%" m={5}>
              <FormControl>
                <Text mb="8px">Weight used in Kgs</Text>
                <HStack w="100%">
                  <InputGroup w="100%">
                    <InputLeftElement pointerEvents="none" fontSize="1.2em" />
                    <Input
                      color="black"
                      bg="white"
                      key="f3"
                      placeholder="Enter Weight(kilogram)"
                      value={data.weight}
                      onChange={(e) => {
                        upt_value("weight", e.currentTarget.value);
                      }}
                    />
                    <InputRightElement children="Kg" color="black" bg="white" />
                  </InputGroup>
                </HStack>
              </FormControl>
            </WrapItem>

            <WrapItem w="48%" m={5}>
              <FormControl>
                <Text mb="8px">Exercise Sets</Text>
                <HStack w="100%">
                  <InputGroup w="100%">
                    <InputLeftElement pointerEvents="none" fontSize="1.2em" />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Enter number of Exercise Sets"
                      value={data.sets}
                      onChange={(e) => {
                        upt_value("sets", e.currentTarget.value);
                      }}
                    />
                    <InputRightElement
                      children="Sets"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </FormControl>
            </WrapItem>

            <WrapItem w="48%" m={5}>
              <FormControl>
                <Text mb="8px">Exercise Reps</Text>
                <HStack w="100%">
                  <InputGroup w="100%">
                    <InputLeftElement pointerEvents="none" fontSize="1.2em" />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Enter number of Exercise Reps"
                      value={data.reps}
                      onChange={(e) => {
                        upt_value("reps", e.currentTarget.value);
                      }}
                    />
                    <InputRightElement
                      children="Reps"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </FormControl>
            </WrapItem>
          </Wrap>
        </Flex>
      </>
    );
  };

  return (
    <NavBar
      children={
        <>
          <title>Fit-track(AddWorkout)</title>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab
                outline="none"
                color="white"
                _selected={{ color: "white", bg: "teal" }}
              >
                Schedule
              </Tab>
              <Tab
                outline="none"
                color="white"
                _selected={{ color: "white", bg: "teal" }}
              >
                Playlits
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>{tab1 ? Schedule() : Body("schedule")}</TabPanel>
              <TabPanel p={0}>
                {tab2 ? exc_playlist() : Body("playlist")}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      }
    />
  );
};

export default addworkout;
function key(
  key: any
): (value: string, index: number, array: string[]) => void {
  throw new Error("Function not implemented.");
}
