const Footer = () => {
  return (
    <footer style={{ margin: 20 }}>
      <div style={{ textAlign: "center" }}>
        {`Copyright © 2024 Artamananda v${process.env.APP_VERSION} All rights reserved`}
      </div>
    </footer>
  );
};

export default Footer;
