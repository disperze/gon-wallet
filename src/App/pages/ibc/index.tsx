import * as React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useBoolean,
  useToast,
  Text,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { TransactionLink } from "../../components"
import {
  AppConfig,
  assertTxSuccess,
  configKeplr,
  createClient,
  loadKeplrWallet,
  mapEventAttributes,
  useSdk,
  waitingIbcTransfer,
} from "../../services";
import { MsgTransfer } from "../../proto/nft_transfer/tx";
import { fromBech32, toUtf8, toBase64 } from "@cosmjs/encoding";
import { networks } from "../../../config";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

async function getKeplrSigner(config: AppConfig) {
  const anyWindow = window as any;
  await anyWindow.keplr?.experimentalSuggestChain(configKeplr(config));
  await anyWindow.keplr?.enable(config.chainId);

  return await loadKeplrWallet(config.chainId);
}

export const IBCTransfer = () => {
  const query = useQuery();
  const toast = useToast();
  const { getSignClient, address } = useSdk();
  const [classId, setClassId]= useState<string>(query.get("cid") ?? "");
  const [tokenId, setTokenId]= useState<string>(query.get("nid") ?? "");
  const [origin, setOrigin]= useState<string>(query.get("chain") ?? "");
  const [recipient, setRecipient]= useState<string>();
  const [channel, setChannel]= useState<string>();
  const [resultClass, setResultClass]= useState<string>();
  const [loading, setLoading] = useBoolean();

  function resetForm() {
    setOrigin("");
    setClassId("");
    setTokenId("");
    setOrigin("");
    setRecipient("");
    setChannel("");
  }
  async function createNft(e: any) {
    e.preventDefault();

    if (!address) {
      toast({
        title: "Account required.",
        description: "Please connect wallet.",
        status: "warning",
        position: "top",
        isClosable: true,
      });

      return;
    }

    if (!classId || !tokenId || !origin || !recipient) {
      return;
    }

    setLoading.on();

    try {
      setResultClass("");
      const network = networks[origin];
      const { prefix } = fromBech32(recipient);
      const ibcParams = network.channels?.find((c) => c.id === prefix)
      if (!ibcParams) {
        throw new Error("Invalid recipient address");
      }

      // timeout
      const d = new Date();
      d.setMinutes(d.getMinutes() + 10);
      const timeout = d.getTime() * 1000000; // nanoseconds

      let client, sender;
      if (origin === "iaa") {
        sender = address;
        client = getSignClient()!;
      } else {
        const signer = await getKeplrSigner(network);
        sender = (await signer.getAccounts())[0].address;
        client = await createClient(network, signer);
      }

      const ibcChannel = channel || ibcParams.channel;
      let msg;
      if (network.keplrFeatures.includes("cosmwasm")) {
        const ics721Contract = ibcParams.port.split(".")[1];
        msg = {
          typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
          value: MsgExecuteContract.fromPartial({
            contract: classId,
            sender,
            msg: toUtf8(JSON.stringify({
              send_nft: {
                contract: ics721Contract,
                token_id: tokenId,
                msg: toBase64(toUtf8(JSON.stringify({
                  receiver: recipient,
                  channel_id: ibcChannel,
                  timeout: {
                    timestamp: timeout.toString(),
                  }
                }))),
              },
            })),
            funds: [],
          })
        };
      } else {
        msg = {
          typeUrl: "/ibc.applications.nft_transfer.v1.MsgTransfer",
          value: MsgTransfer.fromPartial({
            classId: classId,
            tokenIds: tokenId.split(","),
            sender,
            receiver: recipient,
            sourceChannel: ibcChannel,
            sourcePort: ibcParams.port,
            timeoutHeight: {revisionHeight: 0, revisionNumber: 0},
            timeoutTimestamp: timeout,
          })
        };
      }

      const res = await client.signAndBroadcast(sender, [msg], 1.2, "GoN");
      assertTxSuccess(res);

      toast({
        title: `Successful Transaction`,
        description: (<TransactionLink tx={res.transactionHash} explorerUrl={network.explorerTx} />),
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });

      const packetAttrs = mapEventAttributes(res.events, "send_packet");
      const query =`recv_packet.packet_dst_channel='${packetAttrs['packet_dst_channel']}' AND recv_packet.packet_sequence='${packetAttrs['packet_sequence']}'`;
      const dstNetwork = networks[prefix];
      waitingIbcTransfer(dstNetwork.rpcUrl, query, sender)
      .then((tx: any) => {
        setLoading.off();
        toast({
          title: `IBC Completed`,
          description: (<TransactionLink tx={tx.events['tx.hash'][0]} explorerUrl={dstNetwork.explorerTx} />),
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });

        if (dstNetwork.keplrFeatures.includes("cosmwasm")) {
          const events = tx.data.value.TxResult.result.events;
          const minterB64 = btoa('minter')
          const wasm = events.find((e: any) => e.type === "wasm" && e.attributes.some((a: any) => a.key === minterB64))
          if (!wasm) return;
          const cw721Contract = atob(wasm.attributes.find((a: any) => a.key === btoa('_contract_address')).value)
          setResultClass(cw721Contract);
        } else {
          const traceEvent = tx.events['class_trace.classID'];
          if (!traceEvent) return;
          setResultClass(traceEvent[0]);
        }
      });

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
      setLoading.off();
    }
  }

  const { isOpen, onToggle } = useDisclosure();

  return (
  <Flex
    p={4}
    mb={8}
    justifyContent="center"
    direction="row">
    <Box maxW="500px" w="100%">
      <Box>
        <Box mt={6} mb={10}>
          <Heading as="h3" fontSize="3xl">IBC NFT-Transfer</Heading>
        </Box>
        <Box as={'form'} id="nft-form" onSubmit={createNft}>
        <Box mt={4}>
          <FormControl id="class" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >Chain</FormLabel>
            <Select placeholder="Select Network"
              value={origin}
              onChange={e => setOrigin(e.target.value)} >
              <option value='iaa'>IRIS</option>
              <option value='juno'>JUNO</option>
              <option value='stars'>STARGAZE</option>
              <option value='omniflix'>Omniflix</option>
              {/* <option value='uptick'>Uptick</option> */}
            </Select>
          </FormControl>
        </Box>
        <Box mt={4}>
          <FormControl id="class" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >{ ['juno', 'stars'].includes(origin??"") ? "Contract:" : "ClassID" }</FormLabel>
            <Input
              name="class"
              value={classId}
              spellCheck={false}
              onChange={e => setClassId(e.target.value)} />
          </FormControl>
        </Box>
        <Box mt={4}>
          <FormControl id="id" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >TokenID</FormLabel>
            <Input
              name="id"
              spellCheck={false}
              value={tokenId}
              onChange={e => setTokenId(e.target.value)} />
          </FormControl>
        </Box>
        <Box mt={4}>
          <FormControl id="name" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >Recipient</FormLabel>
            <Input
              name="name"
              value={recipient}
              spellCheck={false}
              onChange={e => setRecipient(e.target.value)} />
          </FormControl>
        </Box>
        <Box mt={4}>
          <Button size="sm" onClick={onToggle} mt="1rem">
            Advanced
          </Button>
          <Collapse in={isOpen}>
            <FormControl id="channel" mt={2}>
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Channel (Optional)</FormLabel>
              <Input
                name="channel"
                value={channel}
                spellCheck={false}
                onChange={e => setChannel(e.target.value)} />
            </FormControl>
          </Collapse>
         </Box>
          <Box mt={6}>
            <Button
              isLoading={loading}
              loadingText="Sending..."
              type="submit"
              height="var(--chakra-sizes-10)"
              fontSize={'md'}
              fontWeight="semibold"
              borderRadius={'50px'}
              color={'white'}
              bg="cyan.900"
              _hover={{
                bg: "gray.500",
              }}>
              Transfer
            </Button>
          </Box>
        </Box>
      </Box>

      {resultClass && <Box>
        <Box mt={6} mb={10}>
          <Heading as="h3" fontSize="3xl">Remote Result</Heading>
          <Text fontSize="md" mt={2}>
            <strong>{resultClass?.startsWith("ibc/") ? "ClassID" : "Contract"}:</strong>&nbsp;
            {resultClass}
          </Text>
        </Box>
      </Box>}
    </Box>
  </Flex>
  );
}
