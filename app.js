const {scrape,scrapeAll} = require('./app_modules/scraper.js')
const {readYear} = require("./app_modules/read.js")
const http = require("http")

const server = http.createServer();
server.on("request", async (req,res)=>{
    if (req.url.includes("fav")){
        res.end();
        return;
    }
    res.writeHeader(200,{'Access-Control-Allow-Origin':'*'})
    const startIndex = req.url.indexOf("=");
    const year = req.url.slice(startIndex+1);
    console.log(year);
    const obj = await readYear(year)
    let result = JSON.parse(obj);
    result = JSON.stringify(result)
    res.end(result)

})

server.listen(3000)




