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
  HStack,
} from "@chakra-ui/react";
import { AiFillSave } from "react-icons/ai";

function Card(props: any) {
  return (
    <Box
      p={4}
      display={{ md: "flex", sm: "block" }}
      width={{ md: "500px", sm: "350px" }}
      borderWidth={1}
      margin={5}
      background="white"
    >
      <Image
        width="200px"
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
          <Stack>
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
              value={props.data.name}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Stack>

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
            value={`${props.data.height} cm`}
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
            Email:-
          </FormLabel>
          <Editable
            fontWeight="bold"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
            value={props.data.email}
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
            Date of Birth:-
          </FormLabel>
          <Editable
            fontWeight="bold"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
            value={props.data.dob}
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
          rightIcon={<AiFillSave />}
          onClick={(e) => {
            alert("sorry for now you cant edit your profile!");
          }}
        >
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}

export default Card;
