import Head from 'next/head'
import { useState } from 'react';

export default function Home() {

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <>
      <Head>
        <title>NFT Showcase</title>
        <meta name="description" content="Frontend Engineer Technical Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </>
  )
}
