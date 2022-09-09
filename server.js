const http = require("http");
const fs = require("fs");


const httpserver = http.createServer();
httpserver.on("listening",()=>console.log("lisitning!..."))

httpserver.on("request",(req,res)=>{
    if(req.url === "/"){
        res.end(fs.readFileSync("index.html"))
        return;
    }
    if(req.url === "/upload"){
        const fileName = req.headers["file-name"];
        req.on("data",chunk=>{
            console.log(chunk)
            fs.appendFileSync(fileName,chunk);
        })
        res.end("uploaded");
    }
})

httpserver.listen(8000);