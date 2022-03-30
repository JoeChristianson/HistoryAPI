const {types,checkTypes} = require("./eventTypes");

class Event{
    constructor(text,html){
        this.text=text;
        this.length =text.length;
        this.references= findBetween(text,"[","]");
        this.citationNeeded=this.references.includes("citation needed");
        this.html = html;
        this.links = findBetweenSp(html,"<a",">")
        this.types = [];
    }
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

// function findBetweenSp(text,openChars,closeChars){
//     const references = []
//     let reference=""
//     inBrackets = false;
//     let opening = "";
//     let closing = ""
//     for(let i = 0;i<text.length;i++){
//         if (closing === closeChars&&inBrackets){
//             references.push(reference);
//             inBrackets = false;
//             reference="";
//             closing=""
//         }
//         else if(inBrackets){
//             reference+=text[i];

//         }
//         else if(text[i]===openChars[opening.length]){
//             opening+=text[i];
//         }
//     }
// }

const filter = {
    minLength:"Patan, Chaulukya Dynasty (India) – 100,000[2]".length,
    barred:[""],
}

function eFilterer(events){
    const filtered = [];
    for( let event of events){
        if (event[0].length<=filter.minLength){
            continue;
        }
        else filtered.push(new Event(event[0],event[1]))
    }
    return filtered
}

module.exports = {filter,eFilterer}

