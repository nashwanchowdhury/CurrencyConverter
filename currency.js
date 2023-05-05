function initializePost(){
    if (localStorage.getItem("saved") !== null){
        return
    } else if(localStorage.getItem("saved") === null){
        localStorage.setItem("saved", JSON.stringify([]))
    } else{
        return "Something is wrong. Please try again"
    }
}
initializePost();

let saveddata = JSON.parse(localStorage.getItem("saved"));

let convertBtn = document.getElementById("convert");

convertBtn.addEventListener("click", validatePost);

async function getConversionData() {
let base = document.getElementById("base-currency").value; 

let amount = document.getElementById("amount").value; 
    
let target = document.getElementById("target-currency").value; 

var myHeaders = new Headers();
myHeaders.append("apikey", "XRBEzRiDKCkoHoMUqa5aL4gKeWjAHjUe");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${target}&from=${base}&amount=${amount}`, requestOptions);

const responsedata = await response.json();

displayData(responsedata);
}

function displayData(responsedata) {
let result = responsedata.result
let targetcurrency = responsedata.query.to
document.getElementById("converted-amount").innerHTML = result + " " + targetcurrency;
}


let historyBtn = document.getElementById("historical-rates");

historyBtn.addEventListener("click", getHistoryData);

async function getHistoryData() {
let base = document.getElementById("base-currency").value; 
    
let target = document.getElementById("target-currency").value; 

var myHeaders = new Headers();
myHeaders.append("apikey", "XRBEzRiDKCkoHoMUqa5aL4gKeWjAHjUe");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
}

const historyresponse = await fetch(`https://api.apilayer.com/exchangerates_data/2013-12-24?symbols=${target}&base=${base}`, requestOptions);

const historydata = await historyresponse.json();

displayHistoryData(historydata);
};

function displayHistoryData(historydata) {
    let basecurrency = historydata.base
    let targetcurrency = Object.keys(historydata.rates)[0];
    let targetrate = Object.values(historydata.rates)[0];
    document.getElementById("historical-rates-container").innerHTML = "Historical exchange rate on 2013-12-24: 1 " + basecurrency + " = " + targetrate + ' ' + targetcurrency;
}

let saveBtn = document.getElementById("save-favorite");

saveBtn.addEventListener("click", saveFavorite);

function saveFavorite() {
let base = document.getElementById("base-currency").value; 
let target = document.getElementById("target-currency").value; 
let a = {
    base: base,
    target: target,
}
saveddata.push(a);
localStorage.setItem("saved", JSON.stringify(saveddata));
}

let showBtn = document.getElementById("show-favorite");

showBtn.addEventListener("click", displayFavorite);

function displayFavorite() {
    for (let i = 0; i < saveddata.length; i++) {
        let feed = document.getElementById("favorite-currency-pairs");
        let div = document.createElement('div');
        let basecurrency = saveddata[i].base;
        let targetcurrency = saveddata[i].target;
        let saveButtons = '<button onclick=useFavorite(this.innerHTML)>' + `${basecurrency}/${targetcurrency}` + '</button>'
        saveButtons.innerHTML = basecurrency;
        div.innerHTML = saveButtons;
        feed.append(div);
    }
}

function reply_click(x) {
    return x;
}

function useFavorite(x) {
    let y = reply_click(x);
    let r = y.substring(0, 3);
    let e = y.substring(4, 7);
    document.getElementById("base-currency").value = r;
    document.getElementById("target-currency").value = e;  
}

function validateZ() {
    let z = document.getElementById("amount").value;
    return parseInt(z);
}



function validatePost(){
    let x = document.getElementById("base-currency").value;
  
    let y = document.getElementById("target-currency").value;

    if (validateZ() <= 0)  {
        alert("Please provide a valid amount above 0");
    }
    else if(x == y)  {
        alert("Please provide two different currencies"); 
    } else {
    getConversionData(); 
    }
    
}
  
  






