const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http");
var https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
// to get all the static files
// to create a folder to place all the files like css and images an all files other then html files
// call it  using static keyword which nis in express
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})
app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address:email,
        status : "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/93095f2704"
  const options = {
    method:"POST",
    auth:"ADITYA:ace20bebaea7dbcb806c57acd68807f6-us21"
  }

  const request = https.request(url,options,function(response){
    if (response.statusCode === 200) {
      // res.send("Successfully subscribed!");
      res.sendFile(__dirname + "/success.html");
    }
    else
    {
      res.sendFile(__dirname + "/Failure.html");
      // res.send("there was an error with signup!");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));

    })

  })
  request.write(jsonData);
  request.end();

  // console.log(firstName , lastName , email);
});
app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});
// ace20bebaea7dbcb806c57acd68807f6-us21
// unique id -
// 93095f2704
