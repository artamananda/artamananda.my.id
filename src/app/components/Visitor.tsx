"use client";

import getColor from "../hooks/useColor";

import dynamic from "next/dynamic";
const AnimatedNumbers = dynamic(() => import("react-awesome-animated-number"), {
  ssr: false,
});
import "react-awesome-animated-number/dist/index.css";

const Visitor = (props: { title: string; total: number }) => {
  const { textColor } = getColor();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        maxWidth: 300,
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedNumbers
          hasComma
          value={props.total}
          size={40}
          duration={300}
        />
      </div>
      <div>{props.title}</div>
    </div>
  );
};

export default Visitor;
