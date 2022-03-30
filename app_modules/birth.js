class Birth{
    constructor(text,html){
        this.text=text;
        this.length =text.length;
        this.references= findBetween(text,"[","]");
        this.citationNeeded=this.references.includes("citation needed");
        this.html = html;
        this.name = findBefore(text,",")
        
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

function findBefore(text,substring){
    const index = text.indexOf(substring);
    const newText = text.substring(0,index);
    return newText;
}

const filter = {
    minLength:"Patan, ".length,
    barred:["See also","portal"],

}

function bFilterer(births){
    const filtered = [];
    for( let birth of births){
        let isFiltered = false;
        if (birth[0].length<=filter.minLength){
            isFiltered = true;
        }
        for (let bar of filter.barred){
            if (birth[0].includes(bar)){
                console.log("barred")
                isFiltered = true;
            }
        }
        if (isFiltered) continue;
        filtered.push(new Birth(birth[0],birth[1]))
    }
    return filtered
}

module.exports = {filter,bFilterer}

