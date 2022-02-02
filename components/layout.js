import Head from "next/head";
import AppBar from "./AppBar";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Zecmarketcap</title>
        {/* add icon <link rel="icon" href="ref.ico" /> */}
      </Head>
      <AppBar />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
