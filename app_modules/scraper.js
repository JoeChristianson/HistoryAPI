const puppeteer = require('puppeteer');
const {write} = require('./fileManager.js')
const {eFilterer} = require("./event.js")
const {bFilterer} = require("./birth.js")
const {dFilterer} = require("./death.js")
async function scrape(year){
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await page.goto(`https://en.wikipedia.org/wiki/AD_${year}`)
    var listItems = await page.evaluate(()=> Array.from(document.querySelectorAll('li,h2'),element=> element.textContent));
    var listItemsFull = await page.evaluate(()=> Array.from(document.querySelectorAll('li,h2'),element=> [element.textContent,element.innerHTML]));

    let eventsIndex;
    let birthsIndex;
    let deathsIndex;
    let referencesIndex;
    for (let i = 0;i<listItems.length;i++){
        if(listItemsFull[i][0].includes("Events")){
            eventsIndex = i;
        }
        if(listItemsFull[i][0].includes("Births")){
            birthsIndex = i;
        }
        if(listItemsFull[i][0].includes("Deaths")){
            deathsIndex = i;
        }
        if(listItemsFull[i][0].includes("References")){
            referencesIndex = i;
        }

    }
    let events = listItemsFull.slice(eventsIndex+1,birthsIndex);
    events = eFilterer(events,year);
    let births = listItemsFull.slice(birthsIndex+1,deathsIndex);
    births = bFilterer(births)
    let deaths = listItemsFull.slice(deathsIndex+1,referencesIndex);
    deaths = dFilterer(deaths)
    const yearObj = {
        events: events,
        births:births,
        deaths:deaths,
    }
    write(`${year}.json`,JSON.stringify(yearObj,null,2));
    browser.close();
    console.log(yearObj.events[1]);
    console.log(yearObj.births[1])
    console.log(yearObj.deaths[1])
}

async function scrapeAll(startYear,endYear){
    for(let i = startYear;i<=endYear;i++){
        const result = await scrape(i);
    }
}
module.exports = {scrape,scrapeAll};