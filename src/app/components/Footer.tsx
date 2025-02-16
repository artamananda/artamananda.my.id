const Footer = () => {
  return (
    <footer style={{ margin: 20, width: "70vw" }}>
      <div style={{ textAlign: "center", fontSize: 12 }}>
        {`Copyright © 2024 Artamananda v${process.env.APP_VERSION} All rights reserved`}
      </div>
    </footer>
  );
};

export default Footer;
