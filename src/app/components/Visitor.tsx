"use client";

import AnimatedNumbers from "react-animated-numbers";
import getColor from "../assets/color/color";

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
          includeComma
          transitions={(index) => ({
            type: "tween",
            duration: index + 0.3,
          })}
          animateToNumber={props.total}
          fontStyle={{
            fontSize: 40,
            color: textColor,
          }}
        />
      </div>
      <div>{props.title}</div>
    </div>
  );
};

export default Visitor;
