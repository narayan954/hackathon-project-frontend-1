import React, { useEffect, useState } from 'react';
// import AgoraUIKit from 'agora-react-uikit';
import dynamic from 'next/dynamic';

const AgoraUIKit = dynamic(() => import('agora-react-uikit'), { ssr: false });

const MeetingPage = () => {
  let isBrowser = typeof window !== undefined;

  useEffect(() => {
    isBrowser = typeof window !== undefined;
  }, []);

  const rtcProps = {
    appId: 'cdb0d15073364265b7c2af3d7b4e8019',
    channel: 'test123', // your agora channel
  };
  const callbacks = {
    EndCall: () => console.log('ended'),
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
