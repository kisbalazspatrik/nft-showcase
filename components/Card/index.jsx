import {
  Flex,
  Image,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  useDisclosure,
  Button,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { SiOpensea } from "react-icons/si";

const Card = ({
  title,
  description,
  img,
  id,
  type,
  address,
  owner,
  collectionInfo,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        flexDir="column"
        bg={useColorModeValue("#EDF2F7", "rgba(255, 255, 255, 0.08)")}
        p={5}
        borderRadius={12}
        position="relative"
        as={motion.div}
        whileHover={{ scale: 1.05 }}
      >
        <Image borderRadius={12} src={img} width="100%" height="100%" />
        <Flex align={"center"} justify="space-between">
          <Flex flexDir={"column"}>
            <Text title={title} mt={2} fontWeight={600}>
              {title.length > 16 ? title.slice(0, 16) + "..." : title}
            </Text>
            <Text fontWeight={600} fontSize={12} color="gray.500">
              {type}
            </Text>
          </Flex>
          <Flex>
            <Icon
              as={FiExternalLink}
              w={6}
              h={6}
              cursor="pointer"
              onClick={onOpen}
            />
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent mx={4}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image borderRadius={12} src={img} width="100%" height="100%" />
            <Heading fontWeight={800} my={2}>
              {title}
            </Heading>
            <Text>{description}</Text>
            <Text
              fontWeight={600}
              as="a"
              href={collectionInfo.openSea.externalUrl}
              target="_blank"
              mt={2}
              textDecor="underline"
            >
              More about the project
            </Text>
            <Text fontWeight={600}>
              Owner of this NFT:{" "}
              {owner.length == 42
                ? owner.slice(0, 6) + "..." + owner.slice(38)
                : owner}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              display="flex"
              gap={2}
              align="center"
              as={"a"}
              href={`https://opensea.io/assets/${address}/${id}`}
              target="_blank"
            >
              Buy on OpenSea <Icon as={SiOpensea} />
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Card;
