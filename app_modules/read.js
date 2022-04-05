const {readFile,writeFile} = require("fs");
const util = require("util")
const readFilePromise = util.promisify(readFile);
const year = 1000

const readYear = async (year)=>{
    const result =  await readFilePromise(`./data/${year}.json`,"utf-8")
    return result
}



module.exports = {readYear}