const { networkConditions } = require("puppeteer");
const {types,checkTypes} = require("./eventTypes");
const months =["January","February","March"];


class Event{
    constructor(text,html,year){
        this.year=year;
        this.text=text;
        this.length =text.length;
        this.references= findBetween(text,"[","]");
        this.citationNeeded=this.references.includes("citation needed");
        this.html = html;
        this.links = findBetweenSp(html,"<a",">");
        this.entities = findEntities(this.links);
        this.types = checkTypes(text);
        this.date = checkDate(text.split(":")[0])
    }
}

function findEntities(links){
    let res = []
    for (let link of links){
        let  ent = findBetweenSp(link,"wiki/",'\"')[0]
        console.log("ent is " + ent)
        if(!ent) continue;
        ent = ent.replace('wiki/',"").replace('\"','')
        !ent.includes("Wikipedia") && res.push(ent)
    }
    return res;
}

function findBetween(text,openChar,closeChar){
    const references = []
    let reference=""
    inBrackets = false;
    for(let i = 0;i<text.length;i++){
        if(text[i]===closeChar && reference!==""){
            references.push(reference);
            inBrackets = false;
            reference="";
        }
        else if(inBrackets){
            reference+=text[i]
        } 
        else if(text[i]===openChar) inBrackets = true;
    }
    return references;
}

function findBetweenSp(text,openingString,closingString){
    const arr = [];
    let subStart = "";
    let subEnd = "";
    let inner = "";
    for (let i = 0;i<text.length;i++){
        if(subStart===openingString){
            if(text[i]===closingString[subEnd.length]){
                subEnd+=text[i];
            }
            if(subEnd === closingString){
                arr.push(openingString+inner+closingString);
                inner=""
                subStart="";
                subEnd =""
            }
            else inner+=text[i];
        }
        else if(text[i]!==openingString[subStart.length]){
            subStart=""
        }
        else if(text[i]===openingString[subStart.length]){
            subStart+=text[i]
        }
    }
    return arr;
}

const filter = {
    minLength:"Patan, Chaulukya Dynasty (India) – 100,000[2]".length,
    barred:[""],
}

function eFilterer(events,year){
    const filtered = [];
    for( let event of events){
        if (event[0].length<=filter.minLength){
            continue;
        }
        else filtered.push(new Event(event[0],event[1],year))
    }
    return filtered
}

module.exports = {filter,eFilterer}

function checkDate(text){
    let res = null;
    for(let month of months){
        if (text.includes(month)){
            res = text;
        }
    }
    return res;
}