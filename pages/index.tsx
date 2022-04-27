import { useEffect, useState } from "react";
import { roundTo } from "round-to";
import Converter from "../components/Converter";
// import Converter from "../components/Converter";
import TableContainer from "../components/TableContainer";

const parseconverterData = (data) => {
  let temp = [];
  let tempObject = [];
  let zcashData = {};
  let zcashPrice = -1;
  tempObject["Zcash"] = { priceUSD: 40.0 };

  // extract zcash info first
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
          4
        ).toLocaleString(),
      });
      tempObject["Zcash"] = {
        priceUSD: roundTo(d.quote.USD.price, 4),
      };
    }
  });

  data.slice(0, 40).map((d, index) => {
    tempObject[d.name] = {
      priceUSD: roundTo(d.quote.USD.price, 2),
    };
    temp.push({
      id: index + 1,
      name: d.name,
      priceUSD: roundTo(d.quote.USD.price, 2).toLocaleString(),
      priceZcash: roundTo(d.quote.USD.price / zcashPrice, 4).toLocaleString(),
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

  return [tempObject, temp];
};

export default function Home({}) {
  const [tableData, setTableData] = useState<any>();
  const [converterData, setconverterData] = useState<any>();

  useEffect(() => {
    const url = "https://cmc-api-backend.herokuapp.com/getFeed";
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const [d1, d2] = parseconverterData(data);
        setconverterData(d1);
        setTableData(d2);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {converterData && <Converter tempObject={converterData} />}
      {tableData && <TableContainer data={tableData} />}
    </div>
  );
}
