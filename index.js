let request = require("request");
let fs = require("fs");

let cheerio = require("cheerio");
console.log("Sending Request");
let url = "https://www.worldometers.info/coronavirus/";

request(url, cb);
function cb(err,response,html){
    console.log("Recieved Request");
    if(err ==null && response.statusCode == 200){
        fs.writeFileSync("lbc1.html", html);
        console.log("File Saved");
        parseHtml(html);
    }else if (response.statusCode == 404){
        console.log("Page not found");
    } else {
        console.log(err);
        console.log(response.statusCode);
    }
}

function parseHtml(html){
    console.log("Parsing Html");
    let $ = cheerio.load(html);
     let dataarr = $('#main_table_countries_today tbody');
    dataarr = $(dataarr[0]).find('tr');
    //console.log(dataarr.length);
    for(let i=0; i<dataarr.length; i++){
        let data = $(dataarr[i]).find('td');
        data = $(data).slice(1, 3);
        console.log($(data[0]).text()+" "+$(data[1]).text());
    }
}