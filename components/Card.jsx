import React from "react";
import {
  Box,
  Image,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { AiFillSave } from "react-icons/ai";

function Card(props) {
  const { product, summary, longLine } = props;

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
      background="white"
    >
      <Image
        maxWidth="200px"
        margin="auto"
        minWidth="10rem"
        src="https://cdn-icons-png.flaticon.com/512/387/387564.png"
        alt="Woman paying for a purchase"
      />
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <FormControl>
          <FormLabel
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="md"
            color="black"
          >
            Name:-
          </FormLabel>
          <Editable
            fontWeight="bold"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
            width="250px"
            defaultValue="Tejas Jagdale"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>

          <FormLabel
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="md"
            color="black"
          >
            Height:-
          </FormLabel>
          <Editable
            fontWeight="bold"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
            defaultValue="173 cm"
          >
            <EditablePreview  />
            <EditableInput  />
          </Editable>

          <FormLabel
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="md"
            color="black"
          >
            Age:-
          </FormLabel>
          <Editable
            fontWeight="bold"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
            defaultValue="20 years"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>

          <FormLabel
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="md"
            color="black"
          >
            Current Weight:-
          </FormLabel>
          <Editable
            fontWeight="bold"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
            defaultValue="50 kgs"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </FormControl>
        <Button
          maxWidth="135px"
          _hover={{ bg: "teal", color: "white" }}
          bg="teal.400"
          color="white"
          my={2}
          rightIcon={<AiFillSave/>}
        >
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}

export default Card;
