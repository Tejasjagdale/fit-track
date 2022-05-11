import * as fs from "fs";

export default async function handler(req, res) {
    if(req.method == 'POST'){
        fs.readFile('userdata/userdata.json', 'utf8', function (err, data) {
            if (err)
               return console.log(err);
            let users = JSON.parse(data).users
            console.log('result read: ' + JSON.stringify(users));
         });
        // fs.writeFile('userdata/userdata.json', data, options, callback )
    }
}