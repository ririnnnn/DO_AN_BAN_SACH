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
  return `${startDate.getDate()}/${startDate.getMonth()} - ${endDate.getDate()}/${endDate.getMonth()}`;
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
      displayStatistic,
      user?.access_token
    );
    setSaleData(processSaleData(result.data, displayStatistic));
  }
  async function getAllGenre() {
    const result = await GenreService.getAllGenre();
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
    console.log(result);
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
          console.log(dateData);
          const currentDate2 = new Date();
          if (!dateData[0])
            result.push({
              key: i,
              time: `${currentDate.getDate()}/${currentDate.getMonth()}`,
            });
          else {
            const processedRow = {};
            dateData[0].statisticByPediod.forEach((element) => {
              processedRow[element.genre] = element.count;
              total += element.count;
            });
            processedRow.time = `${currentDate.getDate()}/${currentDate.getMonth()}`;
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
          console.log(dateData);
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
          console.log(dateData);
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
    }
  }
  useEffect(() => {
    getSaleStatistic();
    getAllGenre();
  }, []);

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
              <option value="day" selected>
                Ngày
              </option>
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
              <option value="revenue" selected>
                Doanh thu
              </option>
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
        <Table columns={columns} dataSource={saleData}></Table>
      </div>
    </div>
  );
};

export default AdminHome;
