class Death{
    constructor(text,html){
        this.text=text;
        this.length =text.length;
        this.references= findBetween(text,"[","]");
        this.citationNeeded=this.references.includes("citation needed");
        this.html = html;
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

const filter = {
    minLength:"Patan, Chaulu".length,
    barred:["See also","portal"],
}

function dFilterer(deaths){
    const filtered = [];
    for( let death of deaths){
        let isFiltered = false;
        if (death[0].length<=filter.minLength){
            isFiltered = true;
        }
        for (let bar of filter.barred){
            if (death[0].includes(bar)){
                console.log("barred")
                isFiltered = true;
            }
        }
        if (isFiltered) continue;
        filtered.push(new Death(death[0],death[1]))
    }
    return filtered
}

module.exports = {filter,dFilterer}

