import Image from "next/image";
import ListButton from "./components/ListButton";
export default function Home() {
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
        <div>
          <div>0 is Live</div>
        </div>
      </div>
      <footer style={{ margin: 20 }}>
        <div style={{ textAlign: "center" }}>
          {`Copyright © 2024 Artamananda v${process.env.APP_VERSION} All rights reserved`}
        </div>
      </footer>
    </div>
  );
}
