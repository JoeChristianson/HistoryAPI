const {scrape,scrapeAll} = require('./app_modules/scraper.js')
const {readYear} = require("./app_modules/read.js")
const http = require("http")
const port = process.env.PORT || 5000;

const server = http.createServer();
// server.on("request", async (req,res)=>{
//     if (req.url.includes("fav")){
//         res.end();
//         return;
//     }
//     res.writeHeader(200,{'Access-Control-Allow-Origin':'*'})
//     const startIndex = req.url.indexOf("=");
//     const year = req.url.slice(startIndex+1);
//     console.log(year);
//     const obj = await readYear(year)
//     let result = JSON.parse(obj);
//     result = JSON.stringify(result)
//     res.end(result)

// })

server.listen(port)
// scrapeAll(1900,1910);



// server.on("request", async (req,res)=>{
//     if (req.url.includes("fav")){
//         res.end();
//         return;
//     }
//     res.writeHeader(200,{'Access-Control-Allow-Origin':'*'})
//     res.end("port working")

// })

server.on("request", async (req,res)=>{
    if (req.url.includes("fav")){
        res.end();
        return;
    }
    if(req.url === "/"){
        res.end("Specify Year")
    }
    res.writeHeader(200,{'Access-Control-Allow-Origin':'*'})
    console.log("THE URL IS:" + req.url)
    const startIndex = req.url.indexOf("=");
    const year = req.url.slice(startIndex+1);
    // res.end(year)
    console.log(year);
    const obj = await scrape(year);
    result = JSON.stringify(obj)
    res.end(result)
})