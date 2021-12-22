import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="fixed bottom-0 widthPlayer">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
