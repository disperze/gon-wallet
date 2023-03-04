import {
  Box,
  chakra,
  Flex,
  Image,
} from "@chakra-ui/react";
import * as React from "react";
import { NftInfo } from "../../services/type";
import cosmverseLogo from "../../assets/cosmverse.jpg";

interface NftCardProps {
  readonly nft: NftInfo;
}

export function NftCard({ nft }: NftCardProps): JSX.Element {
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="full">
        <Image
          bgGradient="linear(to-r, green.200, pink.500)"
          roundedTop="lg"
          h={56}
          w="full"
          fit="cover"
          src={nft.image}
          fallbackSrc={cosmverseLogo}
          alt={nft.title}
        />
        <Box px={4} bg="gray.500" roundedBottom="md">
          <Box py={2}>
            <chakra.h1
              color={"white"}
              fontWeight="bold"
              fontSize="2xl"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              title={nft.title}
            >
              {nft.title || nft.tokenId}
            </chakra.h1>
            <chakra.p
              mt={1}
              fontSize="xs"
              color="white"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {nft.denom}
            </chakra.p>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
