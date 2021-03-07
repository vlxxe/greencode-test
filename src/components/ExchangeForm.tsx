import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import Title from "antd/lib/typography/Title";

import { ICurrencyItem } from "../App";

const { Option } = Select;

interface Props {
  currenciesData: ICurrencyItem[];
}

const fixedNumber = (num: number): number => {
  return Number(num.toFixed(3));
};

export const ExchangeForm: React.FC<Props> = ({ currenciesData }) => {
  const [amountFrom, setAmountFrom] = useState<number>(1);
  const [amountTo, setAmountTo] = useState<number>(0);
  const [currencyNameTo, setCurrencyNameTo] = useState<string>(
    currenciesData[0].currencyName
  );
  const [exchangeRate, setExchangeRate] = useState<number>(
    currenciesData[0].rate
  );

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = +e.target.value;
    setAmountFrom(amount);
    setAmountTo(fixedNumber(amount * exchangeRate));
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = +e.target.value;
    setAmountTo(amount);
    setAmountFrom(fixedNumber(amount / exchangeRate));
  };

  const handleSelectChange = (currencyName: string) => {
    setCurrencyNameTo(currencyName);
    const rate = currenciesData.find(
      (item) => item.currencyName === currencyName
    )?.rate;
    if (rate) setExchangeRate(rate);
  };

  useEffect(() => {
    const rate = currenciesData.find(
      (item) => item.currencyName === currencyNameTo
    )?.rate;
    if (rate) setAmountTo(fixedNumber(amountFrom * rate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRate]);

  useEffect(() => {
    const updatedCurr = currenciesData.find(
      (el) => el.currencyName === currencyNameTo
    );
    if (updatedCurr?.rate === exchangeRate) {
      setAmountTo(fixedNumber(amountFrom * exchangeRate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenciesData]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Input
          type="number"
          value={amountFrom}
          onChange={handleFromAmountChange}
          suffix="RUB"
        />

        <Select
          defaultValue={currencyNameTo}
          style={{ width: 120 }}
          onChange={handleSelectChange}
        >
          {currenciesData.map((item) => (
            <Option key={item.currencyName} value={item.currencyName}>
              {item.currencyName}
            </Option>
          ))}
        </Select>

        <Input type="number" value={amountTo} onChange={handleToAmountChange} />
      </div>

      <Title level={4} style={{ textAlign: "center" }}>
        {amountFrom} RUB = {amountTo} {currencyNameTo}
      </Title>
    </div>
  );
};
