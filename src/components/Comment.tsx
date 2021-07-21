import {
    Box,
    Flex,
    Text,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Button,

} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

import { Colors } from "../helper/theme";
import {
    AiOutlineLike,
    AiOutlineDislike,
    AiOutlineComment,
    AiFillDislike,
    AiFillLike,
} from "react-icons/ai";
import { IComment } from "../models/Comment";

interface ICommentProps {
    _id: number,
    padding: number,
    user: String,
    createdAt: String,
    message: String,
    likes: number,
    replies: IComment[],
    comments: IComment[] | undefined,
    setComments: React.Dispatch<React.SetStateAction<IComment[] | []>>,
}


const Comment: React.FC<ICommentProps> = ({
    _id,
    padding,
    user,
    createdAt,
    message,
    likes,
    replies,
    comments,
    setComments,
}) => {
    const [showReply, setShowReply] = useState(false);
    const [commentTxt, setCommentTxt] = useState("");
    const [commentLikes, setCommentLikes] = useState(likes || 0);
    const [commentUsername, setCommentUsername] = useState(user || "");
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const handleLike = () => {
        if (!isLiked) {
            setCommentLikes(likes + 1);
            setIsDisliked(false);
        } else {
            setCommentLikes(likes);
        }

        setIsLiked(!isLiked);
        // setCommentLikes(commentLikes + value);
    };
    const handleDislike = () => {
        if (!isDisliked) {
            setCommentLikes(likes - 1);
            setIsLiked(false);
        } else {
            setCommentLikes(likes);
        }
        setIsDisliked(!isDisliked);
        // setCommentLikes(commentLikes + value);
    };

    const handleCommentEnter = () => {

        if (commentTxt !== "" && commentUsername !== "") {
            const date = new Date().toISOString().slice(0, 10);
            const newComment = {
                _id: Math.floor(Math.random() * 1000000),
                message: commentTxt,
                userName: commentUsername,
                createdAt: date,
                likes: 0,
                replies: [],
            };

            replies.push(newComment);

            setShowReply(false);
            setCommentTxt("");
        } else {
            alert("Please Input a Valid Comment");
        }
    };


    useEffect(() => {

    }, [replies])

    return (
        <Flex direction="column" my={2} pl={padding ? padding : 0}>
            <Flex direction="row" align="center" borderLeftColor="facebook.500" borderLeftWidth={3} borderRadius={6}>
                <Image
                    boxSize={6}
                    bg="white"
                    borderRadius={40}
                    p={1}
                    mr={2}
                    ml={2}
                    src={process.env.PUBLIC_URL + "/avatar.png"}
                />

                <Text fontWeight="bold" fontSize="md">
                    {user}
                </Text>
                <Box mr={2} />
                <Text fontSize={14} color={Colors.primaryColor900}>
                    {createdAt}
                </Text>
            </Flex>

            <Text ml={1}>{message}</Text>

            <Flex direction="row" my={1} align="center">
                <IconButton
                    mr={2}
                    onClick={handleLike}
                    aria-label="Like Comment"
                    variant="outline"
                    color={isLiked ? "facebook.300" : "black"}
                    icon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
                />
                <Text mr={2} fontWeight="bold">
                    {commentLikes}
                </Text>
                <IconButton
                    mr={2}
                    onClick={handleDislike}
                    aria-label="Dislike Comment"
                    variant="outline"
                    color={isDisliked ? "facebook.300" : "black"}
                    icon={isDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
                />
                <IconButton
                    mr={2}
                    aria-label="Reply"
                    variant="outline"
                    onClick={() => setShowReply(!showReply)}
                    icon={<AiOutlineComment />}
                />
                <Button colorScheme="linkedin" variant="ghost" mr={2}>Save</Button>
                <Button colorScheme="red" variant="ghost" mr={2}>Report</Button>
            </Flex>

            {showReply && (
                <Flex w="80%" py={2}>
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
                            value={commentUsername.toString()}
                            onChange={(e) => setCommentUsername(e.target.value)}
                        />

                        <Button width={40} onClick={handleCommentEnter} colorScheme="facebook">
                            Submit
          </Button>
                    </InputGroup>
                </Flex>
            )}

            {replies &&
                replies.map((reply) => (
                    <Fade key={reply._id}
                    >
                        <Comment
                            _id={reply._id}
                            padding={10}
                            user={reply.userName}
                            createdAt={reply.createdAt}
                            likes={reply.likes}
                            message={reply.message}
                            replies={reply.replies}
                            setComments={setComments}
                            comments={comments}
                        />
                    </Fade>

                ))}
        </Flex>
    );
};
export default Comment;
