import { lineChartService } from "../../services/dashBoard";
var getDataChartFromReact = async () => {
  await lineChartService();
};
export const data = {
  dataLine: [getDataChartFromReact()],
  dataChart: [
    {
      id: 1,
      day: "Thứ 3",
      amount: 3,
    },
    {
      id: 2,
      day: "Thứ 2",
      amount: 10,
    },
    {
      id: 3,
      day: "Chủ nhật",
      amount: 8,
    },
    {
      id: 4,
      day: "Thứ 7",
      amount: 9,
    },
    {
      id: 5,
      day: "Thứ 6",
      amount: 10,
    },
    {
      id: 6,
      day: "Thứ 5",
      amount: 9,
    },
    {
      id: 7,
      day: "Thứ 4",
      amount: 8,
    },
  ],

  dataMonth: [
    {
      id: 1,
      weekday: "Tháng 1",
      userGain: 122,
    },
    {
      id: 2,
      weekday: "Tháng 2",
      userGain: 112,
    },
    {
      id: 3,
      weekday: "Tháng 3",
      userGain: 200,
    },
    {
      id: 4,
      weekday: "Tháng 4",
      userGain: 160,
    },
    {
      id: 5,
      weekday: "Tháng 6",
      userGain: 220,
    },
    {
      id: 6,
      weekday: "Tháng 7",
      userGain: 145,
    },
    {
      id: 7,
      weekday: "Tháng 8",
      userGain: 230,
    },
    {
      id: 7,
      weekday: "Tháng 9",
      userGain: 165,
    },
    {
      id: 7,
      weekday: "Tháng 10",
      userGain: 148,
    },
    {
      id: 7,
      weekday: "Tháng 11",
      userGain: 123,
    },
    {
      id: 7,
      weekday: "Tháng 12",
      userGain: 250,
    },
  ],

  products: [
    {
      id: 1,
      nameCabinet: "cabinet1",
      statusCabinet: 1,
      createdAt: "2023-06-05 19:55:27",
    },
    {
      id: 2,
      nameCabinet: "cabinet1",
      statusCabinet: 1,
      createdAt: "2023-06-05 19:55:27",
    },
    {
      id: 3,
      nameCabinet: "cabinet1",
      statusCabinet: 1,
      createdAt: "2023-06-05 19:55:27",
    },
    {
      id: 4,
      nameCabinet: "cabinet1",
      statusCabinet: 1,
      createdAt: "2023-06-05 19:55:27",
    },
    {
      id: 5,
      nameCabinet: "cabinet1",
      statusCabinet: 1,
      createdAt: "2023-06-05 19:55:27",
    },
    {
      id: 6,
      nameCabinet: "cabinet1",
      statusCabinet: 1,
      createdAt: "2023-06-05 19:55:27",
    },
    {
      id: 7,
      nameCabinet: "cabinet1",
      statusCabinet: 1,
      createdAt: "2023-06-05 19:55:27",
    },
  ],
};
