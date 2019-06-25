var data;
var homedata;
var forCastData;



var searchbox;
var searchbutton;
var userQuery;
var lat;
var lng;

var weatherImg;
var img;
var icon;
var canvas;
var divImg;
var divSec;

var balo;

function preload(){
  balo = loadFont("font/Montserrat-Light.ttf");
}



function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  background(59, 112, 128);
  fill(0);


  divImg = createDiv(" ");
  divSec = createDiv(" ");

  textFont(balo);

  // search box
  searchbox = createInput('').attribute('placeholder', 'City..');
  searchbox.position(windowWidth-265,25)


  // Search button
  searchbutton = createButton("Search");
  searchbutton.position(windowWidth-100,25);
  searchbutton.mousePressed(searchDatabase);


  // get position once
  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(setPos);


}
function setPos(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;


  var pha = "https://api.openweathermap.org/data/2.5/weather?appid=d38c13ea23a6f4f05b26d02279c06a2d&units=metric&";
  var ret = "lat=" + lat + "&lon=" + lng;


  locate = pha + ret;         // user location
  homedata = loadJSON(locate,loData);
  fill(255);
  noStroke();
  rect(-1,70,windowWidth,height);

  function loData(){
    fill(250);
    rectMode(CENTER);
    noStroke();
    rect(width/2,230,600,220,5);
    textAlign(CENTER);


    var druid = homedata.name;
    var scott = homedata.main.temp;
    var stiles = homedata.weather[0].main;
    var lydia = homedata.main.temp_min;
    var alisson = homedata.main.temp_max;
    var beackonHills = homedata.sys.country;
    var weCode = homedata.weather[0].id;




    //// current location output
    fill(59, 112, 128);
    textSize(32);
    text( druid + "," + beackonHills,width/2,180);   //tempreature
    textSize(45);
    text(scott + '°c', width/2+80, 250);
    textSize(16);
    text(stiles,width/2,300);   //type ow weather
    textSize(16);
    text(lydia + "°c" + " " + "·" + " " + alisson + "°c",width/2,320); //minmum tempreature
    divImg.class("owf owf-" + weCode + " " + "owf-3x");
  }
}


function draw() {


}

function searchDatabase(){
  userQuery = searchbox.value();
  searchQuery = "https://api.openweathermap.org/data/2.5/weather?appid=d38c13ea23a6f4f05b26d02279c06a2d&units=metric&q=" + userQuery;        // api has a separate link for search && Api key is "/1/"

  data = loadJSON(searchQuery,gotData);






  function gotData(){
    fill(250);
    rectMode(CENTER);
    noStroke();
    rect(width/2,230,600,220,5);
    textAlign(CENTER);

    var tempName = data.name;
    var temps = data.main.temp;
    var type = data.weather[0].main;
    var minTemp = data.main.temp_min;
    var maxTemp = data.main.temp_max;
    var TempNameCountry = data.sys.country;
    var timeChecked = data.dt;
    var icon = data.weather[0].id;
    console.log(icon);



    //// Header
    fill(59, 112, 128);
    textSize(32);
    text( tempName + "," + TempNameCountry,width/2,180);   //tempreature
    textSize(45);
    text(temps + '°c', width/2+80, 250);
    textSize(16);
    text(type,width/2,300);   //type ow weather
    textSize(16);
    text(minTemp + "°c" + " " + "·" + " " + maxTemp + "°c",width/2,320); //minmum tempreature
    divSec.class("owf owf-" + icon + " " + "owf-3x");

  }




}
