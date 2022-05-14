import * as fs from "fs";

export default async function handler(req, res) {
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  if (req.method == "POST") {
    let idata = req.body;

    let year = idata.date.split("/")[2];
    let month = `${parseInt(idata.date.split("/")[1])}`;
    let day = `${parseInt(idata.date.split("/")[0])}`;

    fs.readFile("userdata/userdata.json", "utf8", function (err, data) {
      if (err) return console.log(err);

      let edata = JSON.parse(data);

      edata[`${idata.email}`]["data_track"][`${year}`][`${month}`].weight[parseInt(day) - 1] = idata.weight

      fs.writeFile(
        "userdata/userdata.json",
        JSON.stringify(edata),
        (err) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ msg: "Weight entered Successfully!" });
        }
      );
    });

  } else {
    let idata = req.query;

    let year = idata.date.split("/")[2];
    let month = `${parseInt(idata.date.split("/")[1])}`;
    let day = `${parseInt(idata.date.split("/")[0])}`;

    fs.readFile("userdata/userdata.json", "utf8", function (err, data) {
      if (err) return console.log(err);

      let edata = JSON.parse(data);
      let years = Object.keys(edata[`${idata.email}`]["data_track"]);

      if (years.includes(year)) {
        let months = Object.keys(
          edata[`${idata.email}`]["data_track"][`${year}`]
        );

        if (months.includes(month)) {
          if (
            edata[`${idata.email}`]["data_track"][`${year}`][`${month}`].weight[
              parseInt(day) - 1
            ] === null
          ) {
            res.status(200).json({ msg: false });
          } else {
            res
              .status(200)
              .json({
                msg: true,
                weight:
                  edata[`${idata.email}`]["data_track"][`${year}`][`${month}`]
                    .weight[parseInt(day) - 1],
              });
          }
        } else {
          edata[`${idata.email}`]["data_track"][year][month] = {
            weight: new Array(daysInMonth(month, year)).fill(null),
          };
          fs.writeFile(
            "userdata/userdata.json",
            JSON.stringify(edata),
            (err) => {
              if (err) {
                console.log(err);
              }
              res.status(200).json({ msg: false });
            }
          );
        }
      } else {
        edata[`${idata.email}`]["data_track"][year] = {};
        edata[`${idata.email}`]["data_track"][year][month] = {
          weight: new Array(daysInMonth(month, year)).fill(null),
        };
        fs.writeFile("userdata/userdata.json", JSON.stringify(edata), (err) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ msg: false });
        });
      }
    });
  }
}
