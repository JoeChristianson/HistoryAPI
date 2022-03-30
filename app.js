const fs = require("fs");
const {scrape,scrapeAll} = require('./app_modules/scraper.js')
const {write} = require("./app_modules/fileManager")

const history = [];
let years=[];


scrapeAll(1000,1000)






