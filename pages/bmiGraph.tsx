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

  const [userdata, setUserData] = useState<any>();
  interface userdata {
    data_track: object;
  }
  const [bmi, setbmi] = useState<Array<any>>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(userdata);
    if (userdata) {
      if (
        userdata.data_track[`${tDate.getFullYear()}`][`${tDate.getMonth() + 1}`]
      ) {
        setWeight(
          userdata.data_track[`${tDate.getFullYear()}`][
            `${tDate.getMonth() + 1}`
          ].weight
        );
      } else {
        setWeight([]);
      }

      setbmi(userdata.bmi_range);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    click: function () {
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

  const options: any = {
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

  function daysInMonth(month: any, year: any) {
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

        const max = Math.max.apply(
          null,
          userdata.data_track[`${startDate.getFullYear()}`][
            `${startDate.getMonth() + 1}`
          ].weight
        );

        if (userdata.bmi_range[0] > max) {
          setbmi([userdata.bmi_range[0], userdata.bmi_range[0] + 1]);
        } else if (
          userdata.bmi_range[0] < max &&
          (userdata.bmi_range[1] + userdata.bmi_range[0]) / 2 > max
        ) {
          setbmi([
            userdata.bmi_range[0],
            (userdata.bmi_range[1] + userdata.bmi_range[0]) / 2,
          ]);
        } else {
          setbmi(userdata.bmi_range);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <NavBar
        // eslint-disable-next-line react/no-children-prop
        children={
          <Wrap padding={{ lg: 20, md: 10, sm: 0 }} background="#1E2225">
            <WrapItem width="100vw" justifyContent="center">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                inline
              />
            </WrapItem>

            <WrapItem width="100vw">
              <Line
                options={options}
                data={data}
                style={{ height: 500, width: "auto" }}
              />
            </WrapItem>
          </Wrap>
        }
      />
    </>
  );
};

export default BmiGraph;
