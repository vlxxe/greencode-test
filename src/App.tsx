import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";

import { CurrencyList } from "./components/CurrencyList";
import { ExchangeForm } from "./components/ExchangeForm";

export interface ICurrencyItem {
  currencyName: string;
  rate: number;
}

const convertFormat = (obj: { [key: string]: number }): ICurrencyItem[] => {
  const result = [];
  for (let key in obj) {
    result.push({
      currencyName: key,
      rate: obj[key],
    });
  }
  return result;
};

function App() {
  const [currenciesData, setCurrenciesData] = useState<ICurrencyItem[]>([]);

  const fetchCurrenciesData = () => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((data) => setCurrenciesData(convertFormat(data.rates)));
  };

  useEffect(() => {
    fetchCurrenciesData();

    const interval = setInterval(() => fetchCurrenciesData(), 10000);

    return () => clearInterval(interval);
  }, []);

  if (!currenciesData.length) {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <Row justify="center" align="middle" gutter={[48, 0]}>
      <Col span={5}>
        <ExchangeForm currenciesData={currenciesData} />
      </Col>
      <Col span={4}>
        <CurrencyList currenciesData={currenciesData} />
      </Col>
    </Row>
  );
}

export default App;
