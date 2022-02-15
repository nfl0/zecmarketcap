import Head from "next/head";
import AppBar from "./AppBar";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>ZECMarketCap</title>
        add icon <link rel="icon" href="zcashIcon.png" />
      </Head>
      <AppBar />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
