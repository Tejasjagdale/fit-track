import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Utils,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import Router from "next/router";
import NavBar from "../components/NavBar";
import { Wrap, WrapItem } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Annotation from "chartjs-plugin-annotation";

const BmiGraph = () => {
  const cookies = new Cookies();
  let tDate = new Date();

  const [userdata, setUserData] = useState();
  const [bmi, setbmi] = useState([]);
  const [max, setmax] = useState(29);
  const [weight, setWeight] = useState([]);

  useEffect(() => {
    if (cookies.get("id")) {
      fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/userData?email=${cookies.get("id")}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUserData(data[cookies.get("id")]);
        })
        .catch((err) => console.log(err));
    } else {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    if (userdata) {
      setWeight(
        userdata.data_track[`${tDate.getFullYear()}`][`${tDate.getMonth() + 1}`]
          .weight
      );
      setbmi(userdata.bmi_range);
    }
  }, [userdata]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Annotation,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let i = 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "august",
    "september",
    "november",
    "december",
  ];

  const annotation1 = {
    type: "box",
    backgroundColor: "rgba(38, 246, 0, 0.4)",
    borderColor: "rgb(101, 33, 171)",
    borderWidth: 1,
    click: function ({ chart, element }) {
      console.log("Box annotation clicked");
    },
    drawTime: "beforeDatasetsDraw",
    xMax: [max],
    xMin: [0],
    xScaleID: "x",
    yMax: [bmi[1]],
    yMin: [bmi[0]],
    yScaleID: "y",
  };

  const options = {
    color: "white",
    background: "white",
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Weight track according to BMI Index",
        color: "white",
        font: {
          size: 20,
        },
      },
      annotation: {
        annotations: {
          annotation1,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
          size: 20,
        },
      },
      x: {
        ticks: {
          color: "white",
          size: 22,
        },
      },
    },
    Tooltip: {
      text: "hey",
    },
  };

  const labels = [];

  while (i < max + 1) {
    labels.push(i);
    i++;
  }

  const [startDate, setStartDate] = useState(new Date());

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  useEffect(() => {
    if (userdata) {
      if (
        userdata.data_track[`${startDate.getFullYear()}`][
          `${startDate.getMonth() + 1}`
        ]
      ) {
        daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
        while (
          i < daysInMonth(startDate.getMonth() + 1, startDate.getFullYear())
        ) {
          labels.push(i);
          i++;
        }
        setmax(daysInMonth(startDate.getMonth() + 1, startDate.getFullYear()));
        setWeight(
          userdata.data_track[`${startDate.getFullYear()}`][
            `${startDate.getMonth() + 1}`
          ].weight
        );
      } else {
        daysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
        while (
          i < daysInMonth(startDate.getMonth() + 1, startDate.getFullYear())
        ) {
          labels.push(i);
          i++;
        }
        setmax(daysInMonth(startDate.getMonth() + 1, startDate.getFullYear()));
        setWeight([]);
      }
    }
  }, [startDate]);

  const data = {
    labels,
    datasets: [
      {
        label: "Weight on that day",
        data: weight,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <NavBar />
      <Wrap padding={{ lg: 20, md: 10, sm: 0 }} background="#1A202C">
        <WrapItem width="100vw" justifyContent="center" >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            inline
          />
        </WrapItem>

        <WrapItem width="100vw">
          <Line
            options={options}
            data={data}
            style={{ height: { lg: "500", sm: "500" }, width: "auto" }}
          />
        </WrapItem>
      </Wrap>
    </>
  );
};

export default BmiGraph;
