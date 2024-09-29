import Link from "next/link";

const ListButton = (props: { title: string; href: string }) => {
  return (
    <Link
      style={{
        borderRadius: 20,
        backgroundColor: "white",
        color: "black",
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
