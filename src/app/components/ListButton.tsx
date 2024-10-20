import Link from "next/link";
import getColor from "../hooks/useColor";

const ListButton = (props: { title: string; href: string }) => {
  const { textColor, bgColor } = getColor();
  return (
    <Link
      style={{
        borderRadius: 20,
        backgroundColor: textColor,
        color: bgColor,
        paddingInline: 20,
        paddingBlock: 10,
        textAlign: "center",
        fontWeight: "bold",
        cursor: "pointer",
        width: "50vw",
      }}
      href={props.href}
      target="_blank"
    >
      {props.title}
    </Link>
  );
};

export default ListButton;
