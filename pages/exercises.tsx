import { Flex, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import ImageSlider from "../components/ImageSlider";
import NavBar from "../components/NavBar";
import ProductSimple from "../components/Card1";

const List = () => {
  let Slides: string[] = [
    "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/l/742_1.jpg",
    "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/l/742_2.jpg",
  ];

  return (
    <>
      <NavBar
        // eslint-disable-next-line react/no-children-prop
        children={
          <Wrap
            justify="center"
            spacing="30px"
            background="#1A202C"
            padding="10"
          >
            <WrapItem>
              <ProductSimple />
            </WrapItem>
            <WrapItem>
              <ProductSimple />
            </WrapItem>
            <WrapItem>
              <ProductSimple />
            </WrapItem>
            <WrapItem>
              <ProductSimple />
            </WrapItem>
            <WrapItem>
              <ProductSimple />
            </WrapItem>
            <WrapItem>
              <ProductSimple />
            </WrapItem>
            <WrapItem>
              <ProductSimple />
            </WrapItem>
            <WrapItem>
              <ProductSimple />
            </WrapItem>
          </Wrap>
        }
      />
    </>
  );
};

export default List;
