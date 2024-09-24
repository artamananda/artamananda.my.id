"use client";

import { Image } from "antd";
import ListButton from "./components/ListButton";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";

const Visitor = dynamic(() => import("./components/Visitor"), { ssr: false });

export default function Home() {
  const [online, setOnline] = useState(0);
  const [total, setTotal] = useState(0);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const fetchVisitors = async () => {
    try {
      const res = await fetch(`${process.env.BASE_API_URL}/visitors`);
      const result = await res.json();
      setOnline(result?.payload?.onlineVisitors);
      setTotal(result?.payload?.totalVisitors);
      if (result) {
        setIsOnline(true);
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    fetchVisitors();

    const intervalId = setInterval(() => {
      fetchVisitors();
    }, 5000);

    setIsFirstRender(false);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      if (isOnline) {
        toast.success("You're Online");
      } else {
        toast.error("You're Offline");
      }
    }
  }, [isOnline]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        minHeight: "100vh",
      }}
    >
      <Toaster />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "50vw",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Image
          src={`${process.env.STORAGE_URL}/profile.jpg`}
          width={150}
          style={{
            borderRadius: "50%",
            marginInline: "auto",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            paddingBlock: 20,
          }}
        >
          <h3 style={{ textAlign: "center" }}>Artamananda</h3>
          <Image
            src={`${process.env.STORAGE_URL}/verified.png`}
            width={20}
            preview={false}
          />
        </div>
        <ListButton title="LinkedIn" href="/linkedin" />
        <ListButton title="GitHub" href="/github" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            paddingBlock: 20,
          }}
        >
          <Visitor total={online} title="Online" />
          <Visitor total={total} title="Total Visitors" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
