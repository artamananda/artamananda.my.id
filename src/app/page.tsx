"use client";

import Image from "next/image";
import ListButton from "./components/ListButton";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";

const Visitor = dynamic(() => import("./components/Visitor"), { ssr: false });

export default function Home() {
  const [online, setOnline] = useState(0);
  const [total, setTotal] = useState(0);
  const fetchVisitors = async () => {
    const res = await fetch(`${process.env.BASE_API_URL}/api/visitors`);
    const result = await res.json();
    setOnline(result?.payload?.onlineVisitors);
    setTotal(result?.payload?.totalVisitors);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "50vw",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Image
          src="/assets/profil.jpg"
          alt="profile-pict"
          width={150}
          height={150}
          style={{ borderRadius: "50%", marginInline: "auto" }}
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
            src="/assets/verified.png"
            alt="verified"
            width={20}
            height={20}
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
