const highScoreSpan = $("#high-score");
const eventContainer = $("#event-container");
const optionsCont = $("#options")
const btn0=$("#btn-0")
const btn1=$("#btn-1")
const btn2=$("#btn-2")
const prior=$("#prior")
const livesEl=$("#lives")
const pointsEl = $("#points")
const scoreBar = $("#score-bar");
const gameEndCont = $("#game-end")
const finalScoreSpan = $("#final-score")
const playAgainBtn = $("#play-again-btn")
let game;
let highScore = localStorage.getItem("history-game-high-score-472022") || 0;
highScoreSpan.text(highScore)

class Game{
    constructor(){
        this.points=0;
        this.lives=3;
        this.correctIndex=null;
        this.gap = 300;
        this.minYear = 1000;
        this.maxYear = 1999;
    }
}


const getData = async (year)=>{
    const res = await fetch(`http://wiki-events-api.herokuapp.com/?year=${year}`)
    const data = await res.json()
    console.log(data)
    return data
}

const startGame = ()=>{
    game = new Game();
    livesEl.text(wr("♥",game.lives))
    gameEndCont.addClass("hide")
    scoreBar.removeClass("hide");
    eventContainer.removeClass("hide");
    optionsCont.removeClass("hide")
    renderEvent()
}

const renderEvent = async ()=>{
    eventContainer.html("");
    game.year = Math.floor(Math.random()*1000)+1000;
    const data = await getData(game.year);
    const events = data.events;
    let randomEvent = data.events[Math.floor(Math.random()*events.length)].text;
    if (!randomEvent) {
        renderEvent();
        return
    }
        eventContainer.text(removeBetween(randomEvent,"[","]"));
        loadOptions(game.year);
}

startGame()

function loadOptions(year){
    const options = [null,null,null];
    game.correctIndex = Math.floor(Math.random()*3);
    options[game.correctIndex]=game.year;
    for (let i=0;i<3;i++){
        if (!options[i]){
            options[i]=game.year+(i-game.correctIndex)*game.gap;
        }
    }
    if(options[0]<game.minYear||options[2]>game.maxYear){
        loadOptions(game.year)
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
    })
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
    event.target.textContent==game.year?correct():wrong();
})

function correct(){
    console.log(game.points)
    game.points++;
    console.log(game.points)
    pointsEl.text(game.points)
    prior.html(`
    <h3>Correct!</h3>`)
    setTimeout(()=>{
        prior.html("");
    },3000)
    game.gap= Math.ceil(game.gap*0.9);
    renderEvent()
}

function wrong(){
    console.log("wrong")
    prior.html(`
    <h3>Wrong! The correct year is ${game.year}</h3>`)
    setTimeout(()=>{
        prior.html("");
    },5000)
    game.lives--;
    livesEl.text(wr("♥",game.lives))
    if (game.lives<0){
        lose();
        return
    }
    renderEvent()
}

function lose(){
        scoreBar.addClass("hide");
        eventContainer.addClass("hide")
        optionsCont.addClass("hide")
        finalScoreSpan.text(game.points);
        gameEndCont.removeClass("hide");
        if(game.points>highScore){
            highScore=game.points;
            localStorage.setItem("history-game-high-score-472022",highScore)
            highScoreSpan.text(highScore)
        }
}

function wr(char,iterations){
    let str = "";
    for(let i = 0;i<iterations;i++){
        str+=char
    }
    return str;
}

playAgainBtn.on("click",startGame);

