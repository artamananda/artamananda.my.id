"use client";

import getColor from "../hooks/useColor";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const AnimatedNumbers = dynamic(() => import("react-awesome-animated-number"), {
  ssr: false,
});
import "react-awesome-animated-number/dist/index.css";

const Visitor = (props: { title: string; total: number }) => {
  const { textColor } = getColor();
  const router = useRouter();

  const handleClick = () => {
    router.push("/home/visitor-history");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        maxWidth: 300,
        gap: 10,
      }}
      onClick={handleClick}
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
          color={textColor}
        />
      </div>
      <div>{props.title}</div>
    </div>
  );
};

export default Visitor;
