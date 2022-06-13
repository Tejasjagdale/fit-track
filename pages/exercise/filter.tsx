/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
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
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import ProductSimple from "../../components/ExerciseCard";
import { AiFillFilter } from "react-icons/ai";
import qs from "qs";
import { useRouter } from "next/router";
import Router from "next/router";
import { AnyObject } from "chart.js/types/basic";

const List = ({ totalPage, exercises }: any) => {
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
  const router = useRouter();
  const temp_query: any = router.query;
  const [filters, setFilters] = useState<any>({
    level: temp_query.level ? temp_query.level.split(",") : [],
    type: temp_query.type ? temp_query.type.split(",") : [],
    equipment: temp_query.equipment ? temp_query.equipment.split(",") : [],
    muscle: temp_query.muscle ? temp_query.muscle.split(",") : [],
  });

  useEffect(() => {
    setTotalpage(totalPage);
    setExercise(exercises);
  }, [exercises, totalPage]);

  const nextpage = () => {
    curpage !== totalpage ? setCurpage(curpage + 1) : "";
  };

  const prevpage = () => {
    curpage !== 1 ? setCurpage(curpage - 1) : "";
  };

  useEffect(() => {
    let level = temp_query.level ? temp_query.level.split(",") : [];
    let type = temp_query.type ? temp_query.type.split(",") : [];
    let equipment = temp_query.equipment ? temp_query.equipment.split(",") : [];
    let muscle = temp_query.muscle ? temp_query.muscle.split(",") : [];

    const query: any = qs.stringify(
      {
        filters: {
          Level: {
            $in: level,
          },
          Type: {
            $in: type,
          },
          Equipment: {
            $in: equipment,
          },
          Main_Muscle_Worked: {
            $in: muscle,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    console.log(temp_query, query, filters);

    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exercises?${query}&&pagination[page]=${curpage}&pagination[pageSize]=10`
    )
      .then((response) => response.json())
      .then((data) => {
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

    Router.push(`${process.env.NEXT_PUBLIC_URL}/exercise/filter?${query}`);
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
      <NavBar
        children={
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
                            <GridItem key={"muscle" + type} w="100%" h="10">
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
                            <GridItem key={"exc" + type} w="100%" h="10">
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
                            <GridItem key={"level" + type} w="100%" h="10">
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
                            <GridItem key={"equ" + type} w="100%" h="10">
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
                  <HStack maxWidth="100%" spacing={4}>
                    {Object.keys(filters).map(function (key) {
                      return (
                        <Tag
                          size="md"
                          borderRadius="full"
                          variant="solid"
                          colorScheme="green"
                          key={key}
                          p={2}
                          hidden={filters[key].length === 0}
                        >
                          <TagLabel>
                            {filters[key].length !== 0
                              ? `${key}:${filters[key].join(",")}`
                              : ""}
                          </TagLabel>
                          {/* <TagCloseButton /> */}
                        </Tag>
                      );
                    })}
                  </HStack>
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
                <Text ml={5} verticalAlign="center" color="white" fontSize="xl">
                  page {curpage} of {totalpage} pages
                </Text>
              </WrapItem>
            </Wrap>
          </Wrap>
        }
      />
    </>
  );
};

export default List;

export async function getServerSideProps(context: any) {
  let params = context.query;
  let level = params.level ? params.level.split(",") : [];
  let type = params.type ? params.type.split(",") : [];
  let equipment = params.equipment ? params.equipment.split(",") : [];
  let muscle = params.muscle ? params.muscle.split(",") : [];

  const query: any = qs.stringify(
    {
      filters: {
        Level: {
          $in: level,
        },
        Type: {
          $in: type,
        },
        Equipment: {
          $in: equipment,
        },
        Main_Muscle_Worked: {
          $in: muscle,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  let req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exercises?${query}&&pagination[page]=1&pagination[pageSize]=10`
  );
  let output: any = await req.json();

  return {
    props: {
      totalPage: output.meta.pagination.pageCount,
      exercises: output.data,
    }, // will be passed to the page component as props
  };
}
