import React, { useEffect, useState } from "react";

// import AgoraUIKit from 'agora-react-uikit';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const AgoraUIKit = dynamic(() => import("agora-react-uikit"), { ssr: false });

const MeetingPage = () => {
  let isBrowser = typeof window !== undefined;
  const router = useRouter();

  useEffect(() => {
    isBrowser = typeof window !== undefined;
  }, []);

  const rtcProps = {
    appId: "cdb0d15073364265b7c2af3d7b4e8019",
    channel: "test123", // your agora channel
  };
  const callbacks = {
    EndCall: () => router.push("/"),
  };

  if (!isBrowser) return null;

  return (
    <>
      <div className="w-screen h-screen bg-zinc-100 flex flex-col">
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
      </div>
    </>
  );
};

export default MeetingPage;
