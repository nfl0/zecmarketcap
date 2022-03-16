import { roundTo } from "round-to";
import Converter from "../components/Converter";
import { d, t } from "../components/mockData";
// import MainTable from "../components/Table";
import TableContainer from "../components/TableContainer";

const parseData = (data: any, limit: number) => {
  let temp = [];
  let tempObject = {};
  let zcashData = {};
  let zcashPrice = 1;
  data.map((d) => {
    if (d.name === "Zcash") {
      zcashData = d;
      zcashPrice = d.quote.USD.price;
      temp.push({
        id: 0,
        name: d.name,
        priceUSD: roundTo(d.quote.USD.price, 2).toLocaleString(),
        priceZcash: roundTo(d.quote.USD.price / zcashPrice, 2).toLocaleString(),
        percentChange1hUSD: roundTo(d.quote.USD.percent_change_1h, 2),
        percentChange24hUSD: roundTo(d.quote.USD.percent_change_24h, 2),
        percentChange1hZEC: 1,
        percentChange24hZEC: 1,
        marketCapZEC: roundTo(
          d.quote.USD.market_cap / zcashPrice,
          2
        ).toLocaleString(),
      });
      tempObject[d.name] = {
        priceUSD: roundTo(d.quote.USD.price, 2),
      };
    }
  });

  data.slice(0, limit).map((d, index) => {
    tempObject[d.name] = {
      priceUSD: roundTo(d.quote.USD.price, 2),
    };

    temp.push({
      id: index + 1,
      name: d.name,
      priceUSD: roundTo(d.quote.USD.price, 2).toLocaleString(),
      priceZcash: roundTo(d.quote.USD.price / zcashPrice, 2).toLocaleString(),
      percentChange1hUSD: roundTo(d.quote.USD.percent_change_1h, 2),
      percentChange1hZEC: roundTo(
        d.quote.USD.percent_change_1h / temp[0].percentChange1hUSD,
        2
      ),
      percentChange24hUSD: roundTo(d.quote.USD.percent_change_24h, 2),
      percentChange24hZEC: roundTo(
        d.quote.USD.percent_change_24h / temp[0].percentChange24hUSD,
        2
      ),
      // market Cap
      marketCapZEC: roundTo(
        d.quote.USD.market_cap / zcashPrice,
        2
      ).toLocaleString(),
    });
  });
  return [temp, tempObject];
};

export default function Home({}) {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* {tempObject && <Converter tempObject={tempObject} />} */}
      {d && <Converter tempObject={d} />}
      {/* {cryptosData && <MainTable data={cryptosData} />} */}
      {/* {t && <MainTable data={t} />} */}
      {t && <TableContainer data={t} />}
    </div>
  );
}

// export async function getServerSideProps() {
//   console.log("serverside rendering");
//   const url =
//     "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

//   const query = "?limit=80";
//   try {
//     const res = await fetch(url + query, {
//       method: "GET",
//       headers: { "X-CMC_PRO_API_KEY": process.env.API_KEY },
//     });
//     const json = await res.json();
//     const data = json.data;
//     const [cryptosData, tempObject] = parseData(data, 40);
//     return {
//       props: { cryptosData },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {},
//     };
//   }
// }
