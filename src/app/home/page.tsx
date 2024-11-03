"use client";

import { Image } from "antd";
import ListButton from "../components/ListButton";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import "react-chrome-dino-ts/index.css";

const Visitor = dynamic(() => import("../components/Visitor"), { ssr: false });
const DinoGame = dynamic(() => import("react-chrome-dino-ts"), { ssr: false });

export default function Home() {
  const [online, setOnline] = useState(0);
  const [total, setTotal] = useState(0);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const fetchVisitors = async () => {
    try {
      const res = await fetch(`${process.env.BASE_API_URL}/visitors`, {
        method: "GET",
      });
      const result = await res.json();
      if (result?.payload) {
        setOnline(result.payload.onlineVisitors || 0);
        setTotal(result.payload.totalVisitors || 0);
        setIsOnline(true);
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  const postVisitors = async () => {
    try {
      await fetch(`${process.env.BASE_API_URL}/visitors`, {
        method: "POST",
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchVisitors();

    const intervalId = setInterval(() => {
      postVisitors();
      fetchVisitors();
    }, 5000);

    if (isFirstRender) {
      postVisitors();
      setIsFirstRender(false);
    }

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
        flex: 1,
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
          marginTop: 20,
        }}
      >
        <Image
          src={`${process.env.STORAGE_URL}/profile.jpg`}
          width={150}
          preview={false}
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
        <ListButton title="LinkedIn" href="/home/linkedin" />
        <ListButton title="GitHub" href="/home/github" />
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: 11,
          flex: 1,
          marginTop: -50,
        }}
      >
        <DinoGame
          instructions={
            "On your pocket wizard (mobile), just give the screen a tap-tap to make the Dino soar over pesky obstacles, but if you’re on a big ol' laptop, hit that spacebar like it owes you money to get your Dino jumping!"
          }
        />
      </div>

      <Footer />
    </div>
  );
}
