import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import BottomSectionMobile from "../components/BottomSectionMobile";
import Center from "../components/Center";
import Player from "../components/Player";
import PlayerMobile from "../components/PlayerMobile";
import Sidebar from "../components/Sidebar";
import isSmallDevice from "../lib/isSmallDevice";

export default function Home() {
  const [isMobiledevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    let val = isSmallDevice();
    setIsMobileDevice(val);
  }, [])
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="flex">
        <Sidebar />
        <Center isMobiledevice={isMobiledevice}/>
      </main>
      {isMobiledevice ? (
        <div className="fixed bottom-0 widthPlayer">
          <Player />
        </div>
      ) : (
        <>
        <div className="fixed bottom-12 p-2 widthPlayer">
          <PlayerMobile />
        </div>
          <BottomSectionMobile />
        </>
      )}
      {/* {!(isSmallDevice()) && <div className="fixed bottom-12 p-2 widthPlayer">
        <PlayerMobile />
      </div>} */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
