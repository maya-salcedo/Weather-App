const express = require("express"); 
const https = require("https"); //native node module which is bundled within our node project
const bodyParser = require("body-parser");

const app = express();  

app.use(bodyParser.urlencoded({extended: true})); //this code is needed to get body-parser to work

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName; //from the input, name=""
    const apiKey = "8230cfbe09ac9049b26f0f680adedab9";  
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&APPID=" + apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            //data will be in hexadecimal text
            const weatherData = JSON.parse(data);
            //will convert the data into javascript object
            const temp = weatherData.main.temp;
            console.log(temp);
            //to access the value of the temp in main obj; use json viewer pro to get the path of the item
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription); 
            const icon = weatherData.weather[0].icon; //to get the icon
            const imageUrl =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius</h1>`);
            res.write(`<p>The weather is currently ${weatherDescription}</p>`);
            res.write("<img src=" + imageUrl + ">");
            res.send();    
            //can have many .write but only one res.send
        })
    }) //callback function   
});

/*
app.get("/", function(req, res) {
    
})
*/


app.listen(3000, function(){  
    console.log("Server started on port 3000");  
}); 