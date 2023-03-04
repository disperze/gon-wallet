import * as React from "react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  VStack,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import {
  NftInfo,
  useSdk,
} from "../../services";
import { NftCard } from "../../components";
import userLogo from "../../assets/user-default.svg";
import { IrisNFTClient, Nft } from "../../services/client/iris_nft";
import { IDCollection } from "../../proto/nft/nft";

interface AccountParams {
  readonly user: string;
}

const maxItemsPerPage = 15;

export const Account = () => {
  const { user } = useParams<AccountParams>();

  const { nftClient } = useSdk();
  const [nfts, setNfts] = useState<NftInfo[]>([]);

  const getNftsInfo = async (ids: IDCollection[], client: IrisNFTClient) => {
    const allNfts: Promise<Nft>[] = [];
    ids.forEach(collection => {
      collection.tokenIds.forEach((tokenId) => {
        allNfts.push(client.getNFT(collection.denomId, tokenId));
      });
    });

    const tokens = await Promise.all(allNfts);
    return tokens.map((nft) => {
      return {
        denom: nft.cid,
        tokenId: nft.id,
        user: 'unknown',
        title: nft.name,
        price: 'Not listed',
        image: nft.uri?.endsWith(".png") ? nft.uri : "",
        total: 1
      };
    });
  };

  useEffect(() => {
    (async () => {
      if (!nftClient || !user) return;

      const result = await nftClient.getCollections(user, maxItemsPerPage);
      const nfts = await getNftsInfo(result.owner!.idCollections, nftClient);
      setNfts(nfts);
    })();
  }, [nftClient, user]);

  const getNftPath = (cid?: string, nftId?: string) => `/tokens?cid=${cid}&nid=${nftId}`;

  return (
    <Box m={5}>
      <VStack
        spacing={10}
        align="stretch"
      >
        <Flex justifyContent={"center"}>
          <VStack spacing={4}>
            <Box>
              <Image
                borderRadius="full"
                boxSize="120px"
                src={userLogo} />
            </Box>
            <Box bg="gray.500" borderRadius="xl" py={1} px={3}>
              <Text
                color={"white"}
                fontFamily="mono"
                fontSize="sm">
                {user}
              </Text>
            </Box>
          </VStack>
        </Flex>
        <Box>
          <Tabs
            isManual
            isLazy
            colorScheme="cyan">
            <TabList>
              <Tab>My NFTs</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SimpleGrid spacing={10} gridTemplateColumns={["repeat(1, minmax(0px, 1fr))", "repeat(3, minmax(0px, 1fr))", "repeat(5, minmax(0px, 1fr))"]}>
                  {nfts.map(nft => (
                    <LinkBox as="picture" key={nft.denom + ":" + nft.tokenId}
                      transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s"
                      _hover={{
                        transform: "scale(1.05)"
                      }}>
                      <LinkOverlay as={ReactRouterLink} to={getNftPath(nft.denom, nft.tokenId)}>
                        <NftCard nft={nft} />
                      </LinkOverlay>
                    </LinkBox>
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Box>
  );
};
