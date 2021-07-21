import React, { useState } from "react";
import {
    Text,
    Box,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
} from "@chakra-ui/react";
import { AiOutlineComment } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";

import Comment from "./Comment";

import { IComment } from "../models/Comment";

const CommentsThreads = () => {
    const [comments, setComments] = useState<IComment[] | []>([]);
    const [commentTxt, setCommentTxt] = useState("");
    const [userName, setUserName] = useState("");
    const handleCommentEnter = () => {
        if (commentTxt !== "") {
            const date = new Date().toISOString().slice(0, 10);
            const newComment: IComment = {
                _id: Math.floor(Math.random() * 1000000),
                message: commentTxt,
                userName,
                createdAt: date,
                likes: 0,
                replies: [],
            };

            const newComments: IComment[] = [...comments!, newComment];
            setComments(newComments);
            setCommentTxt("");
        } else {
            alert("Input is not Valid, Kindly input both Comment and Username");
        }
    };

    return (
        <Flex
            bg="whiteAlpha.800"
            h="full"
            w="full"
            p={5}
            direction="column"
            borderRadius={20}
        >
            {comments &&
                comments.map((comment: IComment) => (
                    <Fade key={comment._id}
                    >
                        <Comment
                            padding={0}
                            _id={comment._id}
                            user={comment.userName}
                            createdAt={comment.createdAt}
                            likes={comment.likes}
                            message={comment.message}
                            replies={comment.replies}
                            comments={comments}
                            setComments={setComments}
                        />
                    </Fade>
                ))}

            <Box py={2} w="full">
                <Text mb={2} fontWeight="semibold">
                    Enter a New Comment
        </Text>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<AiOutlineComment color="gray.300" />}
                    />

                    <Input
                        mr={2}
                        placeholder="Write A Comment"
                        value={commentTxt}
                        onChange={(e) => setCommentTxt(e.target.value)}
                    />

                    <Input
                        w="40%"
                        mr={2}
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <Button width={40} onClick={handleCommentEnter} colorScheme="facebook">
                        Submit
          </Button>
                </InputGroup>
            </Box>
        </Flex>
    );
};

export default CommentsThreads;
