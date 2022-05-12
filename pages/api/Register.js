import * as fs from "fs";

export default async function handler(req, res) {
    if(req.method == 'POST'){
        fs.readFile('userdata/userdata.json', 'utf8', function (err, data) {
            if (err)
               return console.log(err);
            let edata = JSON.parse(data)
            let height = req.body.details.height
            let bmi_range = [19*(height/100)*(height/100),25*(height/100)*(height/100)]

            edata.users.emails.push(req.body.email)
            edata.users.passwords.push(req.body.password)
            edata.users.details.push(req.body.details)
            edata[`${req.body.email}`] = {
                bmi_range:bmi_range,
                month_year:[],
                data_track:{}
            }

            fs.writeFile( 'userdata/userdata.json',JSON.stringify(edata) , (err)=>{
                if(err){
                    console.log(err)
                }
                res.status(200).json({ msg: "Registration Successfull" });
            })
            console.log('result read: ' + JSON.stringify(edata));
         });
    }
}

// "tejasjagdale60@gmail.com": {
//   "month_year": ["may_2022"],
//   "data_track": { "may_2022": ["50", "50.10", "49.75", "50.25", "60"] }
// }