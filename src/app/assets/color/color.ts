import { useEffect, useState } from "react";

const getColor = () => {
  const [bgColor, setBgColor] = useState<string>("white");
  const [textColor, setTextColor] = useState<string>("black");

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setBgColor(rootStyles.getPropertyValue("--background").trim() || "white");
    setTextColor(rootStyles.getPropertyValue("--foreground").trim() || "black");
  }, []);

  return { bgColor, textColor };
};

export default getColor;
