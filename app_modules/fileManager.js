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

const read = (fileName)=>{
    fs.readFileSync(`./data/${fileName}`,"utf-8",(error,data)=>{
        if (error){
            console.log(error)
        }
    })
}

module.exports = {write,read}