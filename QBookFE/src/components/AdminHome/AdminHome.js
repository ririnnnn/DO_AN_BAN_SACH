import {
  AppstoreOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Select, Button, Form, InputNumber, Table } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
import { convertPrice } from "../../utils/utils";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ContentOfTooltip from "./ContentOfTooltip";
import { WrapperSelect } from "./styles";
import { getStatistic } from "../../services/StatisticService";
import * as GenreService from "../../services/GenreService";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getWeekNumber(date) {
  // Create a copy of the date
  const tempDate = new Date(date);
  // Set to the first day of the year
  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
  const yearStart = new Date(tempDate.getFullYear(), 0, 1);
  // Calculate the number of weeks
  return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
}
function getWeekStartAndEnd(date) {
  const startDate = new Date(date);
  const endDate = new Date(date);

  // Set to the nearest Monday (start of the week)
  startDate.setDate(date.getDate() - date.getDay() + 1);

  // Set to the nearest Sunday (end of the week)
  endDate.setDate(startDate.getDate() + 6);
  return `${startDate.getDate()}/${
    startDate.getMonth() + 1
  } - ${endDate.getDate()}/${endDate.getMonth() + 1}`;
}

const AdminHome = () => {
  const user = useSelector((state) => state.user);
  const [groupBy, setGroupBy] = useState("day");
  const [countBy, setCountBy] = useState("revenue");
  const [time, setTime] = useState(7);
  const [time2, setTime2] = useState("7");
  const [displayStatistic, setDisplayStatistic] = useState("table");
  const [columns, setColumns] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [saleDataChart, setSaleDataChart] = useState({});
  const [genre, setGenre] = useState([]);
  function formatMoney(number) {
    const parts = number.toString().split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
  }

  async function getSaleStatistic() {
    const result = await getStatistic(
      groupBy,
      countBy,
      time,
      "table",
      user?.access_token
    );
    setSaleData(processSaleData(result.data, "table"));
    const result2 = await getStatistic(
      groupBy,
      countBy,
      time,
      "chart",
      user?.access_token
    );
    setSaleDataChart(processSaleData(result2.data, "chart"));
  }
  async function getAllGenre() {
    const result = await GenreService.getAllGenre();
    setGenre(result.data.map((genre) => genre.name));
    setColumns([
      { title: "Thời gian", dataIndex: "time" },
      ...result.data.map((genre) => ({
        title: genre.name,
        dataIndex: genre.name,
        render: (value) => {
          if (value) return formatMoney(value);
          else return 0;
        },
        align: "center",
      })),
      {
        title: "Tổng số",
        dataIndex: "total",
        render: (value) => {
          if (value) return formatMoney(value);
          else return 0;
        },
        align: "center",
      },
    ]);
  }
  function processSaleData(data, type) {
    if (type == "table") {
      const result = [];
      if (groupBy == "day") {
        for (let i = 0; i < time; i++) {
          let total = 0;
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - i);
          const dateData = data.filter((e) => {
            return e._id.period == currentDate.getDate();
          });
          const currentDate2 = new Date();
          if (!dateData[0])
            result.push({
              key: i,
              time: `${currentDate.getDate()}/${currentDate.getMonth() + 1}`,
            });
          else {
            const processedRow = {};
            dateData[0].statisticByPediod.forEach((element) => {
              processedRow[element.genre] = element.count;
              total += element.count;
            });
            processedRow.time = `${currentDate.getDate()}/${
              currentDate.getMonth() + 1
            }`;
            processedRow.key = i;
            processedRow.total = total;
            result.push(processedRow);
          }
        }
      }
      if (groupBy == "week") {
        for (let i = 0; i < time; i++) {
          let total = 0;
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - i * 7);
          const dateData = data.filter((e) => {
            return e._id.period == getWeekNumber(currentDate) - 1;
          });
          const currentDate2 = new Date();
          if (!dateData[0])
            result.push({
              key: i,
              time: getWeekStartAndEnd(currentDate),
            });
          else {
            const processedRow = {};
            dateData[0].statisticByPediod.forEach((element) => {
              processedRow[element.genre] = element.count;
              total += element.count;
            });
            processedRow.time = getWeekStartAndEnd(currentDate);
            processedRow.key = i;
            processedRow.total = total;
            result.push(processedRow);
          }
        }
      }
      if (groupBy == "month") {
        for (let i = 0; i < time; i++) {
          let total = 0;
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - i);
          const dateData = data.filter((e) => {
            return e._id.period == currentDate.getMonth() + 1;
          });
          const currentDate2 = new Date();
          if (!dateData[0])
            result.push({
              key: i,
              time: `${
                currentDate.getMonth() + 1
              }/${currentDate.getFullYear()}`,
            });
          else {
            const processedRow = {};
            dateData[0].statisticByPediod.forEach((element) => {
              processedRow[element.genre] = element.count;
              total += element.count;
            });
            processedRow.time = `${
              currentDate.getMonth() + 1
            }/${currentDate.getFullYear()}`;
            processedRow.key = i;
            processedRow.total = total;
            result.push(processedRow);
          }
        }
      }
      return result;
    } else {
      const result = {};
      const labels = [];
      const datasets = [];
      const lineColors = [
        "#FF5733", // Red
        "#33FF57", // Green
        "#3357FF", // Blue
        "#FF33A6", // Pink
        "#33FFF3", // Cyan
        "#FFA533", // Orange
        "#A533FF", // Purple
        "#33FF99", // Light Green
        "#FF3357", // Light Red
        "#57FF33", // Lime
        "#5733FF", // Indigo
        "#FFDB33", // Yellow
        "#33AFFF", // Sky Blue
        "#FF3380", // Magenta
        "#33FFCC", // Turquoise
      ];
      const total = {};
      total.label = "total";
      total.borderColor = genre.length;
      total.fill = false;
      total.data = new Array(time).fill(0);
      if (groupBy == "day") {
        for (let i = 0; i < time; i++) {
          let total = 0;
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - i);
          const dateData = data.filter((e) => {
            return e._id.period == currentDate.getDate();
          });
          const currentDate2 = new Date();
          labels.push(`${currentDate.getDate()}/${currentDate.getMonth() + 1}`);
        }
      }
      if (groupBy == "week") {
        for (let i = 0; i < time; i++) {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - i * 7);
          const dateData = data.filter((e) => {
            return e._id.period == getWeekNumber(currentDate) - 1;
          });
          labels.push(getWeekStartAndEnd(currentDate));
        }
      }
      if (groupBy == "month") {
        for (let i = 0; i < time; i++) {
          let total = 0;
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - i);
          const dateData = data.filter((e) => {
            return e._id.period == currentDate.getMonth() + 1;
          });
          labels.push(
            `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
          );
          const currentDate2 = new Date();
        }
      }
      for (let i = 0; i < genre.length; i++) {
        const item = {};
        item.label = genre[i];
        item.borderColor = lineColors[i];
        item.fill = false;
        item.data = [];
        const genreData = data.filter((e) => {
          return e._id.genre == genre[i];
        });
        if (groupBy == "day") {
          for (let j = 0; j < time; j++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - j);
            if (genreData[0]) {
              const dateData = genreData[0].statisticByPediod.filter((e) => {
                return e.period == currentDate.getDate();
              });
              if (!dateData[0]) {
                item.data.push(0);
              } else {
                item.data.push(dateData[0].count);
                total.data[j] += dateData[0].count;
              }
            } else {
              item.data.push(0);
            }
          }
        }
        if (groupBy == "week") {
          for (let j = 0; j < time; j++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - j * 7);
            if (genreData[0]) {
              const dateData = genreData[0].statisticByPediod.filter((e) => {
                return e.period == getWeekNumber(currentDate) - 1;
              });
              const currentDate2 = new Date();
              if (!dateData[0]) {
                item.data.push(0);
              } else {
                item.data.push(dateData[0].count);
                total.data[j] += dateData[0].count;
              }
            } else {
              item.data.push(0);
            }
          }
        }
        if (groupBy == "month") {
          for (let j = 0; j < time; j++) {
            const currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() - j);
            if (genreData[0]) {
              const dateData = genreData[0].statisticByPediod.filter((e) => {
                return e.period == currentDate.getMonth() + 1;
              });
              if (!dateData[0]) {
                item.data.push(0);
              } else {
                item.data.push(dateData[0].count);
                total.data[j] += dateData[0].count;
              }
            } else {
              item.data.push(0);
            }
          }
        }
        datasets.push(item);
      }
      console.log(total);
      datasets.push(total);
      result.labels = labels;
      result.datasets = datasets;
      return result;
    }
  }
  useEffect(() => {
    getSaleStatistic();
    getAllGenre();
  }, []);
  useEffect(() => {
    getSaleStatistic();
  }, [genre]);
  // useEffect(() => {
  //   if (displayStatistic == "table") setSaleData([]);
  //   else setSaleData({});
  //   getSaleStatistic();
  // }, [displayStatistic]);

  return (
    <div className="w-full h-full">
      <div className="w-full m-2 rounded-md border border-stone-200 p-2">
        <div className="flex">
          <div className="w-1/3 min-w-[300px]">
            <label className="mr-3">Thống kê theo</label>
            <select
              className="h-8 rounded border border-stone-200 w-[300px]"
              value={groupBy}
              onChange={(e) => {
                setGroupBy(e.target.value);
              }}
            >
              <option value="day">Ngày</option>
              <option value="week">Tuần</option>
              <option value="month">Tháng</option>
            </select>
          </div>
          <div className="w-1/3 min-w-[300px]">
            <label className="mr-3">Loại dữ liệu thống kê</label>
            <select
              className="h-8 rounded border border-stone-200 w-[300px]"
              value={countBy}
              onChange={(e) => {
                setCountBy(e.target.value);
              }}
            >
              <option value="revenue">Doanh thu</option>
              <option value="saleCount">Số lượng bán</option>
            </select>
          </div>
          <div className="w-1/3 min-w-[300px] flex items-center">
            <label className="mr-3">Thời gian thống kê </label>
            <div className="h-8 rounded border border-stone-200 w-[300px] flex">
              <input
                type="number"
                className="w-[250px] h-full focus:outline-none"
                value={time2}
                onChange={(e) => {
                  let value = e.target.value;
                  setTime2(value);
                }}
                onBlur={(e) => {
                  let value = e.target.value;
                  const min = 2;
                  const max =
                    groupBy == "day" ? 30 : groupBy == "week" ? 10 : 12;
                  if (value < min) value = min;
                  if (value > max) value = max;
                  setTime(value);
                  setTime2(value);
                }}
              ></input>
              <div className="w-[50px] border-l border-stone-200 bg-stone-50 h-full justify-center items-center flex">
                {groupBy == "day"
                  ? "ngày"
                  : groupBy == "week"
                  ? "tuần"
                  : "tháng"}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Button color="primary" variant="outlined" onClick={getSaleStatistic}>
            Thống kê
          </Button>
        </div>
      </div>
      <div>
        <div className="w-1/3 min-w-[300px] m-3">
          <label className="mr-3">Phương thức hiển thị</label>
          <select
            className="h-8 rounded border border-stone-200 px-2"
            value={displayStatistic}
            onChange={(e) => {
              setDisplayStatistic(e.target.value);
            }}
          >
            <option value="table">Bảng</option>
            <option value="chart">Biểu đồ</option>
          </select>
        </div>

        {displayStatistic === "table" ? (
          <Table columns={columns} dataSource={saleData}></Table>
        ) : (
          <div className="max-h-screen">
            <Line
              data={saleDataChart}
              // options={{
              //   title: {
              //     display: true,
              //     text: "World population per region (in millions)",
              //   },
              //   legend: {
              //     display: true,
              //     position: "bottom",
              //   },
              // }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
