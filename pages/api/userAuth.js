// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs";

export default function handler(req, res) {
  fs.readFile("userdata/userdata.json", (err, data) => {
    if (err) {
      res.status(500).json({ msg: "Internal server error" });
    }

    let data1 = JSON.parse(data);
    let user = req.query;

    if (data1.users.emails.includes(user.email)) {
      if (
        data1.users.passwords[data1.users.emails.indexOf(user.email)] ===
        user.password
      ) {
        res.status(200).json({ msg: "Login Successfull" });
      } else {
        res.status(500).json({ msg: "password did not matched" });
      }
    } else {
      res.status(500).json({ msg: "user not found" });
    }
  });
}
