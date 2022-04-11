const types = {
    literature:["anthol","literary","histories","write","book"],
    military:["invade","invasion","sack","defeat"," raid"," army","forces","siege"," war ","campaign","battle"],
    royal:[" regen","ruler","heir","archy","reign","Prince","King","Queen","Empress","Emperor"],
    religious:["abbey","mosque","synagogue","religio","convent","patriarch","basilica"," ceremon","temple","monk","buddh","Pope","catholic","orthodox","bishop","archdiocese"],
    establishments:["found","establish"],
    technology:["invention"],
    construction:["monument","buil","erect"],
    marriages:["married","wedding"],
    migration:["settle in","arrive in"],
    political:[" elect ","elects","elected","comes to power"],
    science:["medical","anatomy"," math"," astronom"],
    law:["legal","code","law"],
    humanities:["philosoph"],
    disaster:["earthquake"],
    resistance:["riot"],
    diplomacy:["peace","embass"," ally "],
    punishment:["arrest","prison","executed"],
    violence:["execute"],


}


function checkTypes(text){
    const includedTypes = [];
    for (let type in types){
        const arr = types[type]
        let isType = false;
        for(let term of arr){
            if (text.toLowerCase().includes(term.toLowerCase())){
                isType=true;
            }
        }
        if(isType){
            includedTypes.push(type)
        }
    }
    console.log(includedTypes);
    return includedTypes;
}

checkTypes("I Write a Book on queens");
module.exports = {types,checkTypes}