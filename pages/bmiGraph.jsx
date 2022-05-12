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
import { Wrap } from "@chakra-ui/react";
import Annotation from "chartjs-plugin-annotation";

const bmiGraph = () => {
  const cookies = new Cookies();
  const [userdata, setUserData] = useState();
  const [bmi,setbmi] = useState([])
  const [weight, setWeight] = useState();
  const date =  new Date()
  console.log(date)

  useEffect(() => {
    if (cookies.get("id")) {
      fetch(`http://localhost:3000/api/userData?email=${cookies.get("id")}`)
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
      setWeight(userdata.data_track.may_2022);
      setbmi(userdata.bmi_range)
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

  const day30 = ["february","april","june","august","october","november"];
  const day31 = ["january","march","may","july","september","december"];

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

  let i = 1
  let max_days = 30

  const annotation1 = {
    type: "box",
    backgroundColor: "rgba(38, 246, 0, 0.4)",
    borderColor: "rgb(101, 33, 171)",
    borderWidth: 1,
    click: function ({ chart, element }) {
      console.log("Box annotation clicked");
    },
    drawTime: "beforeDatasetsDraw",
    xMax: [max_days],
    xMin: [0],
    xScaleID: "x",
    yMax: [bmi[1]],
    yMin: [bmi[0]],
    yScaleID: "y",
  };

  const options = {
    color:"white",
    background: "white",
    maintainAspectRatio:true,
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
        color:"white",
        font:{
          size:20
        }
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
          color: 'white',
          size:20
        }
      },
      x: {
        ticks: {
          color: 'white',
          size:22
        }
      }
    },
    Tooltip:{
      text:"hey"
    },
  };


  const labels = [];

  while (i < max_days) {
    labels.push(i)
    i++
  }


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
      <Wrap width="80wh" minHeight="88vh" padding='20' sm={"padding:'0'"} background="#1A202C">
        <Line options={options} data={data} />
      </Wrap>
    </>
  );
};

export default bmiGraph;
