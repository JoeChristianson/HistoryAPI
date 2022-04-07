// const eventContainer = $("#event-container");
// const optionsCont = $("#options")
// const btn0=$("#btn-0")
// const btn1=$("#btn-1")
// const btn2=$("#btn-2")
let year;
let correctIndex;
let gap = 300;
const minYear = 1000;
const maxYear = 1999;

const getData = async (year)=>{
    const res = await fetch(`http://localhost:3000/?year=${year}`)
    const data = await res.json()
    return data
}

const renderEvent = async ()=>{
    eventContainer.html("")
    year = Math.floor(Math.random()*1000)+1000;
    const data = await getData(year);
    const events = data.events;
    let randomEvent = data.events[Math.floor(Math.random()*events.length)]
    console.log("this is the random event:" + randomEvent);
    if (!randomEvent) {
        renderEvent();
        return
    }
        eventContainer.text(removeBetween(randomEvent,"[","]"));
        loadOptions(year);
}

// renderEvent()

function loadOptions(year){
    const options = [null,null,null];
    correctIndex = Math.floor(Math.random()*3);
    options[correctIndex]=year;
    for (let i=0;i<3;i++){
        if (!options[i]){
            options[i]=year+(i-correctIndex)*gap;
        }
    }
    if(options[0]<minYear||options[2]>maxYear){
        loadOptions(year)
        return
    }
    btn0.text(options[0])
    btn0.data("year",options[0])
    btn1.text(options[1])
    btn1.data("year",options[1])
    btn2.text(options[2])
    btn2.data("year",options[2])
}



function removeBetween(text,openChar,closeChar){
    const references = findBetween(text,openChar,closeChar);
    console.log(references)
    references.forEach(ref=>{
        text = text.replace(openChar+ref+closeChar,"")
        console.log(text)
    })
    console.log(text)
    return text;
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

optionsCont.on("click","button",(event)=>{
    event.target.textContent==year?correct():wrong();
})

function correct(){
    console.log("correct")
    renderEvent()
    
}

function wrong(){
    console.log("wrong")
    renderEvent()
}