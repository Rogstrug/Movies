import express from "express";
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3010;

const server = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
server.use('/images', express.static(__dirname + "/images"));
server.use("/sass", express.static(__dirname + "/sass"))


server.get("/", (req,res)=>{
  res.sendFile(__dirname + "/html/index.html");
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