import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { convertDataContentOfTooltip, convertPrice } from "../../utils/utils";

const ContentOfTooltip = (props) => {
  const { dataOrder, dataYear } = props;

  const data = [
    {
      name: "Tháng 1",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 1, dataYear),
    },
    {
      name: "Tháng 2",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 2, dataYear),
    },
    {
      name: "Tháng 3",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 3, dataYear),
    },
    {
      name: "Tháng 4",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 4, dataYear),
    },
    {
      name: "Tháng 5",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 5, dataYear),
    },
    {
      name: "Tháng 6",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 6, dataYear),
    },
    {
      name: "Tháng 7",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 7, dataYear),
    },
    {
      name: "Tháng 8",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 8, dataYear),
    },
    {
      name: "Tháng 9",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 9, dataYear),
    },
    {
      name: "Tháng 10",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 10, dataYear),
    },
    {
      name: "Tháng 11",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 11, dataYear),
    },
    {
      name: "Tháng 12",
      priceOfMonth: convertDataContentOfTooltip(dataOrder, 12, dataYear),
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${
            convertPrice(payload[0].value) || 0
          } VND`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="priceOfMonth" barSize={20} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ContentOfTooltip;
