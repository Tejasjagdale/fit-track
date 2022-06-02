import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  Tag,
  TagLabel,
  Flex,
  Wrap,
  Button,
} from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import Link from "next/link";

interface RatingProps {
    rating: number;
    numReviews: number;
  }
  
  function Rating({ rating, numReviews }: RatingProps) {
    return (
      <Box d="flex" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'teal.500' : 'gray.300'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />;
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && 's'}
        </Box>
      </Box>
    );
  }

export default function blogPostWithImage() {
  let Slides: string[] = [
    "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/l/742_1.jpg",
    "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/l/742_2.jpg",
  ];

  return (
    <Center>
      <Box
        maxW={"300px"}
        w={"full"}
        bg="whiteAlpha.900"
        rounded={"xl"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"160px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <ImageSlider slides={Slides} />
        </Box>
        <Stack mt={16}>
          <Text
            color="#161B25"
            fontWeight={900}
            textColor="#161B25"
            fontSize={"17"}
            fontFamily={"body"}
          >
            Rickshaw Carry
          </Text>
          <Wrap>
            <Text mr={1}>Muscle Targeted :</Text>
            <Tag size={"md"} borderRadius="full" variant="solid" bg="#9933FF">
              <TagLabel>
                <Link href={"#"} passHref>
                  Forearms
                </Link>
              </TagLabel>
            </Tag>
        </Wrap>
          <Wrap>
            <Text mr={1}>Equipment Type :</Text>
            <Tag
              size={"md"}
              borderRadius="full"
              variant="solid"
              bg="#202124"
            >
              <TagLabel>
                <Link href={"#"} passHref>
                  Other
                </Link>
              </TagLabel>
            </Tag>
          </Wrap>
          <Wrap>
            <Text mr={1}>Level : </Text>
            <Tag
              size={"md"}
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <Link href={"#"} passHref>
                <TagLabel>Beginner</TagLabel>
              </Link>
            </Tag>
          </Wrap>
          <Wrap>
          <Rating rating={4} numReviews={94} />
          </Wrap>
          <Wrap>
            <Button bgColor="#2CCCA8" color="white" _hover={{bg:'#2CCCA8'}} size='sm'>View More...</Button>
          </Wrap>
        </Stack>
      </Box>
    </Center>
  );
}
