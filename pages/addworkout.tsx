import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { ArrowBackIcon } from "@chakra-ui/icons";

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

const weak = ()=>{
  return(
    <>
     
    </>
  )
}

const Header = () => {
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
        <Button size="sm" padding="0" mr={3} bg="white" color="#319795">
          <ArrowBackIcon />
        </Button>
        <Heading size="md" letterSpacing={"tighter"}>
          Add Workout
        </Heading>
      </Flex>

      <Box mt={{ base: 4, md: 0 }}>
        <Button
          variant="outline"
          _hover={{ bg: "white", color: "#319795", borderColor: "teal.700" }}
        >
          Add Workout
        </Button>
      </Box>
    </Flex>
  );
};

const Body = () => {
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        color="white"
      >
        <Grid width="100%" templateColumns="repeat(2, 1fr)" rowGap={5}>
          {Muscles.map((type) => (
            <GridItem key={type} w="50%" h="10">
              <Text mb="8px">Value:</Text>
              <Input
                // value={value}
                // onChange={handleChange}
                placeholder="Here is a sample placeholder"
                size="sm"
              />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
};

const addworkout = () => {
  return (
    <NavBar
      // eslint-disable-next-line react/no-children-prop
      children={
        <>
          <Header />
          <Body />
        </>
      }
    />
  );
};

export default addworkout;
