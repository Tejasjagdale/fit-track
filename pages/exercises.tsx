/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
import {
  Box,
  Button,
  Center,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  HStack,
  Image,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductSimple from "../components/ExerciseCard";
import { AiFillFilter } from "react-icons/ai";
import { useRouter } from "next/router";
import Router from "next/router";

const List = () => {
  let Muscles = [
    "Chest",
    "Forearms",
    "Lats",
    "Middle Back",
    "Lower Back",
    "Neck",
    "Quadriceps",
    "Hamstrings",
    "Calves",
    "Triceps",
    "Traps",
    "Shoulders",
    "Abdominals",
    "Glutes",
    "Biceps",
    "Adductors",
    "Abductors",
  ];
  let Exercise_Type = [
    "Cardio",
    "Olympic Weightlifting",
    "Plyometrics",
    "Powerlifting",
    "Strength",
    "Stretching",
    "Strongman",
  ];
  let Equipment = [
    "Bands",
    "Foam Roll",
    "Barbell",
    "Kettlebells",
    "Body Only",
    "Machine",
    "Cable",
    "Medicine Ball",
    "Dumbbell",
    "None",
    "E-Z Curl Bar",
    "Other",
    "Exercise Ball",
  ];
  let Level = ["Beginner", "Intermediate", "Expert"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [exercise, setExercise] = useState([]);
  const [curpage, setCurpage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const temp_query: any = router.query;
  const [filters, setFilters] = useState<any>({
    level: temp_query.level ? temp_query.level.split(",") : [],
    type: temp_query.type ? temp_query.type.split(",") : [],
    equipment: temp_query.equipment ? temp_query.equipment.split(",") : [],
    muscle: temp_query.muscle ? temp_query.muscle.split(",") : [],
  });

  useEffect(() => {
    setIsloading(false);
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exercises?pagination[page]=1&pagination[pageSize]=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setIsloading(true);
        setTotalpage(data.meta.pagination.pageCount);
        setExercise(data.data);
      });
  }, []);

  const nextpage = () => {
    curpage !== totalpage ? setCurpage(curpage + 1) : "";
  };

  const prevpage = () => {
    curpage !== 1 ? setCurpage(curpage - 1) : "";
  };

  useEffect(() => {
    setIsloading(false);
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exercises?pagination[page]=${curpage}&pagination[pageSize]=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setIsloading(true);
        setExercise(data.data);
      });
  }, [curpage]);

  useEffect(() => {
    let level =
      filters.level.length !== 0 ? `level=${filters.level.join(",")}` : "";
    let type =
      filters.type.length !== 0 ? `type=${filters.type.join(",")}` : "";
    let equipment =
      filters.equipment.length !== 0
        ? `equipment=${filters.equipment.join(",")}`
        : "";
    let muscle =
      filters.muscle.length !== 0 ? `muscle=${filters.muscle.join(",")}` : "";

    let query =
      level +
      (level !== ""
        ? type !== "" || equipment !== "" || muscle !== ""
          ? "&"
          : ""
        : "") +
      type +
      (type !== "" ? (equipment !== "" || muscle !== "" ? "&" : "") : "") +
      equipment +
      (equipment !== "" ? (muscle !== "" ? "&" : "") : "") +
      muscle;

    if (type !== "" || equipment !== "" || muscle !== "" || level !== "") {
      Router.push(`${process.env.NEXT_PUBLIC_URL}/exercise/filter?${query}`);
    }
  }, [filters]);

  const setFilter = (key: any, value: any, tag: any) => {
    if (key) {
      filters[tag].push(value);
      setFilters(JSON.parse(JSON.stringify(filters)));
    } else {
      filters[tag] = filters[tag].filter((temp: any) => temp !== value);
      setFilters(JSON.parse(JSON.stringify(filters)));
    }
  };

  return (
    <>
      <title>Fit-Track(exercises)</title>
      <NavBar
        children={
          isloading ? (
            <Wrap
              justify="center"
              spacing="30px"
              background="#1E2225"
              padding="10"
            >
              <WrapItem width="100%" color="white">
                <Drawer
                  size="md"
                  placement="right"
                  onClose={onClose}
                  isOpen={isOpen}
                >
                  <DrawerOverlay />
                  <DrawerContent bg="#191A1C" color="white">
                    <DrawerHeader borderBottomWidth="1px">
                      Exercise Filters
                      <DrawerCloseButton />
                    </DrawerHeader>
                    <DrawerBody>
                      <Wrap>
                        <WrapItem>
                          <Text
                            fontWeight={900}
                            fontSize={"17"}
                            width="100%"
                            fontFamily={"body"}
                            mb="1"
                          >
                            Muscles
                          </Text>
                        </WrapItem>
                        <WrapItem width="100%">
                          <Grid
                            templateColumns="repeat(3, 1fr)"
                            gap={5}
                            rowGap={0}
                          >
                            {Muscles.map((type) => (
                              <GridItem key={type} w="100%" h="10">
                                <Checkbox
                                  colorScheme="red"
                                  defaultChecked={
                                    filters.muscle
                                      ? filters.muscle.includes(type)
                                      : false
                                  }
                                  onChange={(e) => {
                                    setFilter(
                                      e.currentTarget.checked,
                                      type,
                                      "muscle"
                                    );
                                  }}
                                >
                                  {type}
                                </Checkbox>
                              </GridItem>
                            ))}
                          </Grid>
                        </WrapItem>
                        <WrapItem>
                          <Text
                            fontWeight={900}
                            fontSize={"17"}
                            width="100%"
                            fontFamily={"body"}
                            mb="1"
                          >
                            Exercise_Type
                          </Text>
                        </WrapItem>
                        <WrapItem width="100%">
                          <Grid
                            templateColumns="repeat(3, 1fr)"
                            gap={5}
                            rowGap={0}
                          >
                            {Exercise_Type.map((type) => (
                              <GridItem key={type} w="100%" h="10">
                                <Checkbox
                                  colorScheme="red"
                                  defaultChecked={
                                    filters.type
                                      ? filters.type.includes(type)
                                      : false
                                  }
                                  onChange={(e) => {
                                    setFilter(
                                      e.currentTarget.checked,
                                      type,
                                      "type"
                                    );
                                  }}
                                >
                                  {type}
                                </Checkbox>
                              </GridItem>
                            ))}
                          </Grid>
                        </WrapItem>
                        <WrapItem>
                          <Text
                            fontWeight={900}
                            fontSize={"17"}
                            width="100%"
                            fontFamily={"body"}
                            mb="1"
                          >
                            Level
                          </Text>
                        </WrapItem>
                        <WrapItem width="100%">
                          <Grid
                            templateColumns="repeat(3, 1fr)"
                            gap={5}
                            rowGap={0}
                          >
                            {Level.map((type) => (
                              <GridItem key={type} w="100%" h="10">
                                <Checkbox
                                  colorScheme="red"
                                  defaultChecked={
                                    filters.level
                                      ? filters.level.includes(type)
                                      : false
                                  }
                                  onChange={(e) => {
                                    setFilter(
                                      e.currentTarget.checked,
                                      type,
                                      "level"
                                    );
                                  }}
                                >
                                  {type}
                                </Checkbox>
                              </GridItem>
                            ))}
                          </Grid>
                        </WrapItem>
                        <WrapItem>
                          <Text
                            fontWeight={900}
                            fontSize={"17"}
                            width="100%"
                            fontFamily={"body"}
                            mb="1"
                          >
                            Equipment
                          </Text>
                        </WrapItem>
                        <WrapItem width="100%">
                          <Grid
                            templateColumns="repeat(3, 1fr)"
                            gap={5}
                            rowGap={0}
                          >
                            {Equipment.map((type) => (
                              <GridItem key={type} w="100%" h="10">
                                <Checkbox
                                  colorScheme="red"
                                  defaultChecked={
                                    filters.equipment
                                      ? filters.equipment.includes(type)
                                      : false
                                  }
                                  onChange={(e) => {
                                    setFilter(
                                      e.currentTarget.checked,
                                      type,
                                      "equipment"
                                    );
                                  }}
                                >
                                  {type}
                                </Checkbox>
                              </GridItem>
                            ))}
                          </Grid>
                        </WrapItem>
                      </Wrap>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
                <Wrap spacingY="5">
                  <WrapItem width="100%">
                    <Button
                      colorScheme="blue"
                      size="sm"
                      leftIcon={<AiFillFilter />}
                      onClick={onOpen}
                    >
                      Filter
                    </Button>
                  </WrapItem>
                  <WrapItem width="100%">
                    <HStack maxWidth="100%" spacing={4}></HStack>
                  </WrapItem>
                </Wrap>
              </WrapItem>
              {exercise.map((exc: any, index: number) => (
                <WrapItem key={index}>
                  <ProductSimple data={exc.attributes} />
                </WrapItem>
              ))}
              <Wrap width="100%">
                <WrapItem>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    mr={5}
                    disabled={curpage <= 1 ? true : false}
                    onClick={prevpage}
                  >
                    Previous
                  </Button>
                </WrapItem>
                <WrapItem mr={5}>
                  <Button
                    colorScheme="teal"
                    disabled={curpage >= totalpage ? true : false}
                    variant="solid"
                    onClick={nextpage}
                  >
                    Next
                  </Button>
                </WrapItem>
                <WrapItem>
                  <Text
                    ml={5}
                    verticalAlign="center"
                    color="white"
                    fontSize="xl"
                  >
                    page {curpage} of {totalpage} pages
                  </Text>
                </WrapItem>
              </Wrap>
            </Wrap>
          ) : (
            <Wrap
              justify="center"
              align="center"
              background="#1E2225"
              width="100%"
              height="100%"
            >
              <Box width="25%" height="25%">
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL}/loader3.gif`}
                  alt={"Dan Abramov"}
                />
              </Box>
            </Wrap>
          )
        }
      />
    </>
  );
};

export default List;
