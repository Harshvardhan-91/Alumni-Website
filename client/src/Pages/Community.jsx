import React from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Textarea,
  Button,
  Input,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { FiImage, FiVideo, FiSend } from "react-icons/fi";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

const Community = () => {
  const posts = [
    {
      id: 1,
      avatar: "https://via.placeholder.com/50",
      name: "John Doe",
      content: "Excited to share that I've started a new role at XYZ!",
      likes: 10,
      comments: 5,
    },
    {
      id: 2,
      avatar: "https://via.placeholder.com/50",
      name: "Jane Smith",
      content: "Here's my latest article on React best practices.",
      likes: 25,
      comments: 8,
    },
  ];

  return (
    <Box w="100%" maxW="600px" mx="auto" py="6">*/
      {/* Post Creation Area */}
      /*<Box p="4" borderWidth="1px" borderRadius="lg" mb="6">
        <HStack spacing="4">
          <Avatar src="https://via.placeholder.com/50" />
          <Textarea
            placeholder="Start a post..."
            resize="none"
            borderRadius="lg"
          />
        </HStack>
        <HStack mt="3" spacing="4" justify="space-between">
          <HStack spacing="3">
            <IconButton
              icon={<FiImage />}
              aria-label="Attach Image"
              variant="ghost"
            />
            <IconButton
              icon={<FiVideo />}
              aria-label="Attach Video"
              variant="ghost"
            />
          </HStack>
          <Button
            colorScheme="blue"
            leftIcon={<FiSend />}
            size="sm"
          >
            Post
          </Button>
        </HStack>
      </Box>
      {/* Post Feed */}
      <VStack spacing="6">
        {posts.map((post) => (
          <Box
            key={post.id}
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
          >
            <HStack spacing="4" mb="3">
              <Avatar src={post.avatar} />
              <VStack align="start" spacing="0">
                <Text fontWeight="bold">{post.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  1h ago
                </Text>
              </VStack>
            </HStack>
            <Text mb="3">{post.content}</Text>
            <Divider />
            <HStack spacing="4" mt="3">
              <Button
                variant="ghost"
                leftIcon={<AiOutlineLike />}
                size="sm"
              >
                {post.likes} Likes
              </Button>
              <Button
                variant="ghost"
                leftIcon={<AiOutlineComment />}
                size="sm"
              >
                {post.comments} Comments
              </Button>
              <Button
                variant="ghost"
                leftIcon={<AiOutlineShare />}
                size="sm"
              >
                Share
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Community;
