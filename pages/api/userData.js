import * as fs from "fs";

export default function handler(req, res) {
  fs.readFile("userdata/userdata.json", (err, data) => {
    if(err){
      res.status(500).json({error:"Internal server error"})
    }

    let data1 = JSON.parse(data);
    let user = req.query;

    if (data1.users.emails.includes(user.email)) {
      res.status(200).json(data1);
    }else{
      res.status(200).json([]);
    }
  });
}