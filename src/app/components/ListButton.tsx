import Link from "next/link";
import getColor from "../hooks/useColor";

const ListButton = (props: {
  title: string;
  href: string;
  isNew?: boolean;
}) => {
  const { textColor, bgColor } = getColor();
  return (
    <Link
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: textColor,
        color: bgColor,
        paddingInline: 20,
        paddingBlock: 10,
        textAlign: "center",
        fontWeight: "bold",
        cursor: "pointer",
        width: "50vw",
        position: "relative",
        overflow: "hidden",
      }}
      href={props.href}
      target="_blank"
    >
      {props.title}
      {props.isNew && (
        <span
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 30px",
            fontSize: 12,
            fontWeight: "bold",
            position: "absolute",
            right: -30,
            top: -2,
            transform: "rotate(45deg)",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          NEW!
        </span>
      )}
    </Link>
  );
};

export default ListButton;
