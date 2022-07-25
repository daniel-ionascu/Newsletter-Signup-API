const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


//91092965dc6cd1d2b10d6799ed5832d3-us9
//fae276b346

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req,res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/fae276b346";

    const options = {
        method: "POST",
        auth: "hekn:91092965dc6cd1d2b10d6799ed5832d3-us9"
    }

    const request = https.request(url, options, function(response){

            if(response.statusCode === 200){
                    res.sendFile(__dirname + "/success.html");
            } else {
                    res.sendFile(__dirname + "/failure.html");
            }
            
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})


app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
})
