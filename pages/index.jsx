import Card from "@/components/Card";
import ColorModeSwitch from "@/components/ColorModeSwitch";
import Loader from "@/components/Loader";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [owner, setOwner] = useState("");

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState("");

  const [response, setResponse] = useState({});

  const validAddress = (address) => {
    if (!address && address.length === 0) {
      setResponse({
        status: "error",
        message: "Please enter an Ethereum address",
      });
      return false;
    } else {
      setResponse({});
      return true;
    }
  };

  const getNFTs = async () => {
    if (!validAddress(address)) return;
    setLoading(true);
    const baseURL = process.env.NEXT_PUBLIC_ALCHEMY_URL;
    const url = `${baseURL}/getNFTs/?owner=${address}`;

    const config = {
      method: "get",
      url: url,
    };

    // Make the request and print the formatted response:
    axios(config)
      .then((response) => {
        setNfts(response.data.ownedNfts);
        setTotalCount(response.data.totalCount);
        setLoading(false);
        setOwner(address);
      })
      .catch((error) => {
        console.log("error", error);
        setResponse({
          status: "error",
          message: "Something went wrong. Please try again.",
        });
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>NFT Showcase</title>
        <meta name="description" content="Frontend Engineer Technical Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDir={"column"}>
        {loading && <Loader />}
        <Flex justify={"center"} mt={5}>
          <Flex>
            <Input
              placeholder="Enter an Ethereum address"
              onChange={(e) => setAddress(e.target.value)}
              maxW={600}
              borderRightRadius={0}
              borderRight={0}
            />
            <Button borderLeftRadius={0} onClick={() => getNFTs()}>
              Search
            </Button>
          </Flex>
          <Flex ml={4}>
            <ColorModeSwitch />
          </Flex>
        </Flex>
        {response.status && response.message && (
          <Flex justify={"center"} mt={5} px={6}>
            <Alert status={response.status} maxW={600} borderRadius={12}>
              <AlertIcon />
              <AlertDescription>{response.message}</AlertDescription>
            </Alert>
          </Flex>
        )}
        {totalCount && (
          <Flex justify={"center"} mt={5}>
            <Heading
              fontSize={"2xl"}
              fontWeight={700}
              title={totalCount + " NFTs found @ " + owner}
            >
              {totalCount} NFTs found @{" "}
              {owner.length == 42
                ? owner.slice(0, 6) + "..." + owner.slice(38)
                : owner}
            </Heading>
          </Flex>
        )}
        <Flex justify={"center"} mt={5} mx="auto" maxW={1200} px={6}>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            gap={6}
          >
            {nfts?.map((nft, index) => (
              <Card
                key={index}
                title={nft.title}
                description={nft.description}
                img={nft.media[0].gateway}
                id={parseInt(nft.id.tokenId)}
                type={nft.id.tokenMetadata.tokenType}
                address={nft.contract.address}
                owner={owner}
                collectionInfo={nft.contractMetadata}
              />
            ))}
          </Grid>
        </Flex>
      </Flex>
    </>
  );
}
