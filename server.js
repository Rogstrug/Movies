const express = require("express"); //ovo se mora preoblikovati u requrie
const bodyParser = require('body-parser');
const fs = require("fs");
const port = process.env.PORT || 3010;

const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended : true}));

server.use('/images', express.static(__dirname + "/images"));
server.use("/sass", express.static(__dirname + "/sass"))


server.get("/", (req,res)=>{
  res.sendFile(__dirname + "/html/index.html");
})
server.get("/AddMovie", (req,res)=>{
  res.sendFile(__dirname + "/html/AddingForm.html")
})

server.post("/api/dodaj",(req,res)=>{
  const receivedData = req.body;
  receivedData.Image = "URL_TO_YOUR_IMAGE";
  console.log("Data: "+receivedData);
  var all = fs.readFileSync(__dirname + "/data/new_movies.json", "utf-8");
  var jsonData = JSON.parse(all);
  console.log("all data: " + jsonData);
  jsonData.push(receivedData);

  var jsonStringified = JSON.stringify(jsonData, null, 2); // Use 2 spaces for indentation
  fs.writeFileSync(__dirname + "/data/new_movies.json",jsonStringified);

  res.send("USPJEŠNO DODANO");
})


server.get("/AllMovies", (req,res)=>{
  var head = fs.readFileSync(__dirname + "/data/zaglavlje.txt","utf-8");
  var foot = fs.readFileSync(__dirname + "/data/podnozje.txt","utf-8");
  var data = fs.readFileSync(__dirname + "/data/movies.json","utf-8");
  var JSONdata = JSON.parse(data);
  var movieNum = JSONdata.length;
  var rows;
  console.log(movieNum);
  if(!(movieNum % 3)){ //nema ostatka, što znači da je djeljiv s tri i broj redova je točan broju filmova / 3
  rows = movieNum / 3;
  }
  else{
  rows = Math.trunc(movieNum / 3) + 1; //dodajemo jedan red koji je posljednji i neće biti popunjen, trunc zaokružuje na manji
  }
  var middle = ""; //između heada i foota
  var numberOfDisplayedMovies = 0;
  for(var i = 0; i < rows; i++ ){ //iteriramo kroz redove
    middle += `<div class="flex_container">`;
    for(var j = 0; j < 3 && numberOfDisplayedMovies < JSONdata.length; j++){
        middle += `<div class="container">`;
        middle += '<img src="' + JSONdata[numberOfDisplayedMovies].Image + '" alt="0">';
        middle += '<h2>' + JSONdata[numberOfDisplayedMovies].Name + '</h2>'
        middle += '<h3>Genre: ' + JSONdata[numberOfDisplayedMovies].Genre + '</h3>'
        middle += '<h3>IMDB Rating: ' + JSONdata[numberOfDisplayedMovies].IMDB + '</h3>'
        middle += '<h3>Year: ' + JSONdata[numberOfDisplayedMovies].Year + '</h3>'
        middle += '<h3>Director: ' + JSONdata[numberOfDisplayedMovies].Director + '</h3>'
        middle +='</div>';
        numberOfDisplayedMovies++;
      }
    middle += "</div>"; //zatvara flex_container
  }

  res.type("html");
  res.status(200);
  res.write(head);
  res.write(middle);
  res.write(foot);
  res.end();
})



server.get("/javascript",(req,res)=>{
  res.sendFile(__dirname + "/javascript/jsk.js")
})
server.get("/pdf",(req,res)=>{
  res.sendFile(__dirname + "/javascript/pdf.js")
})

server.listen(port, () =>{
  console.log('listening on port ' + port);
});