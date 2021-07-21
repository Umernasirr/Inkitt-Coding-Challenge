import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import CommentsThreads from "../components/CommentsThreads";
const Home: React.FC = () => {
  return (
    <Flex w="full" h="100%" bg="facebook.200">
      <Flex w="full" p={10} justify="center" direction="column">
        <Text fontSize="4xl" fontWeight="bold" color="gray.600">
          Inkitt Coding Challenge
        </Text>
        <Box m={2} />
        <CommentsThreads />
      </Flex>
    </Flex>
  );
};

export default Home;
