import Head from "next/head";

export default function Home({ data }) {
  // zcash id = 1437
  console.log(data);
  return (
    <div>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      {/* <Categories data={props.data} /> */}
      {data && data.map((d) => <p>{d.name}</p>)}
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiKey = "f08ddd72-4d03-436f-b829-a5fec48c07d7";
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  try {
    const res = await fetch(url, {
      headers: { "X-CMC_PRO_API_KEY": apiKey },
    });
    const json = await res.json();
    const data = json.data;
    console.log("here", data);

    data.map((d) => {
      if (d.name === "Zcash") console.log(d);
    });

    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
