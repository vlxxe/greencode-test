import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { ICurrencyItem } from "../App";

interface Props {
  currenciesData: ICurrencyItem[];
}

interface ICurrencyItemWitKey extends ICurrencyItem {
  key: string;
}

const columns = [
  {
    title: "Валюта",
    dataIndex: "currencyName",
    key: "currencyName",
  },
  {
    title: "Курс",
    dataIndex: "rate",
    key: "rate",
  },
];

export const CurrencyList: React.FC<Props> = ({ currenciesData }) => {
  const [currenciesSorted, setCurrenciesSorted] = useState<
    ICurrencyItemWitKey[]
  >([]);

  const dataWithKeyAndRate = (): ICurrencyItemWitKey[] => {
    return currenciesData.map((el) => ({
      ...el,
      key: el.currencyName,
      rate: +(1 / el.rate).toFixed(2),
    }));
  };

  const sortRate = (): ICurrencyItemWitKey[] => {
    const arr = dataWithKeyAndRate();
    return arr.sort((a, b) => b.rate - a.rate);
  };

  useEffect(() => {
    setCurrenciesSorted(sortRate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenciesData]);

  return (
    <div
      style={{
        marginTop: 50,
        height: "70vh",
        overflowY: "scroll",
      }}
    >
      <Table
        dataSource={currenciesSorted}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};
