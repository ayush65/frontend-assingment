/** @format */

import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import { Line } from "react-chartjs-2";
import "./App.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

export const initialState = "Liberia";

export const changetheCountry = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "SETCOUNTRY":
      return action.payload;

    default:
      return state;
  }
};

function App() {
  const [projects, projectsDispatch] = useReducer(
    changetheCountry,
    initialState
  );

  // console.log(projects);

  const [data, setData] = useState([]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
        borderColor: "",
        tension: 0,
        fill: true,
        pointStyle: "",
        pointBorderColor: "",
        pointBackgroundColor: "",
        showLine: true,
      },
    ],
  });
  //   const [employeeSalary, setEmployeeSalary] = useState<any[]>([]);
  //   const [employeeAge, setEmployeeAge] = useState<any[]>([]);

  //console.log(chartData + "hi");

  useEffect(() => {
    const chart = () => {
      let newConfirmed = 0;
      let newDeaths = 0;
      let newRecovered = 0;
      let totalConfirmed = 0;
      let totalDeaths = 0;
      let totalRecovered = 0;

      axios
        .get("https://api.covid19api.com/summary")
        .then((res) => {
          console.log(res.data.Countries);

          setData(res.data.Countries);

          const result = res.data.Countries.filter((item) => {
            //console.log(projects);

            // boom.push(item.Country);

            //   console.log(boom);

            // if (boom.find(projects)) {
            //   return item;
            // } else {
            //   return false;
            // }

            //  console.log(item.Country === projects);

            if ((item.Country === projects) === true) {
              return item;
            } else {
              return false;
            }

            //console.log(item.Country);
          });

          console.log(result[0]);

          console.log(result);

          newConfirmed = result[0].NewConfirmed;
          newDeaths = result[0].NewDeaths;
          newRecovered = result[0].NewRecovered;
          totalConfirmed = result[0].TotalConfirmed;
          totalDeaths = result[0].TotalDeaths;
          totalRecovered = result[0].TotalRecovered;

          //console.log(res.data.Countries);
          // for (const dataObj of res.data.Countries) {
          //   console.log(dataObj.Country);

          //   // if (dataObj.Country === "zimbawe") {
          //   //   console.log(dataObj);

          //   //   boom.push(parseInt(dataObj));
          //   // } else {
          //   //   return false;
          //   // }

          //   console.log(boom);

          //   //    empSal.push(parseInt(dataObj.NewConfirmed));
          //   // empAge.push(parseInt(dataObj.TotalDeaths));
          // }
          setChartData({
            labels: [
              "New Confirmed",
              "New Deaths",
              "New Recovered",
              "Total Confirmed",
              "TotalDeaths",
              "TotalRecovered",
            ],
            datasets: [
              {
                label: "First Dataset",
                data: [
                  newConfirmed,
                  newDeaths,
                  newRecovered,
                  totalConfirmed,
                  totalDeaths,
                  totalRecovered,
                ],
                backgroundColor: "yellow",
                borderColor: "green",
                tension: 0.4,
                fill: true,
                pointStyle: "rect",
                pointBorderColor: "blue",
                pointBackgroundColor: "#fff",
                showLine: true,
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    chart();
  }, [projects]);

  //console.log(data);

  // const options = [
  //   { value: "Afghanistan", label: "Afghanistan" },
  //   { value: "Belgium", label: "Belgium" },
  //   { value: "C", label: "Third" },
  // ];

  return (
    <div>
      <h1 className='graph'>{projects}</h1>
      <div className='graph'>
        <Line data={chartData}></Line>
      </div>
      <div className='app'>
        {data.map((item) => {
          return (
            <div className='card' key={item.ID}>
              <img
                className='img-grid'
                src={item.photoUrl}
                alt={item.photoAlt}
              />
              <h4>
                <b>{item.Country}</b>
              </h4>
              <p>Country Code : - {item.CountryCode}</p>
              <p>
                {" "}
                NewConfirmed :-
                {item.NewConfirmed}
              </p>
              <button
                className='btn-menu'
                onClick={() => {
                  projectsDispatch({
                    type: "SETCOUNTRY",
                    payload: item.Country,
                  });
                }}>
                SHow The Graph
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
