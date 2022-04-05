const fs = require("fs")
const path = require("path")


const write = (fileName,content)=>{
    fs.writeFile(`./data/${fileName}`,content,function(error){
        console.log("Data Saved");
        if (error){
            console.log(error)
        }
    })

}

module.exports = {write,}