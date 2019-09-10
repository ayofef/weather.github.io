import axios from "axios";

import { proxy, key } from "../config";
import { elements, clearLoader } from "../views/base";



/**
 * GEt CURRENT POSITION
 */





export default class Current{
    constructor(long, lat){
        this.long = long;
        this.lat = lat;
    }

    async getCurrentWeather(){
        try{
            const data = await axios (`${proxy}https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&lat=${this.lat}&lon=${this.long}`);
            this.result = data;

        }catch(error){
            console.log(error);
            
            clearLoader();
            const errorMarkup = `
            <div class="error__handler">
                <img src="img/error.svg" alt="Error Image" class="error__handler--img">
                <p class="error__handler--text">Oh oh.. Please try again</p>
            </div>`;
            elements.currentWeatherBox.insertAdjacentHTML("afterbegin", errorMarkup);
        }
    }

    async getCurrentForecast(){
        try{
            var forecast = await axios (`${proxy}https://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&lat=${this.lat}&lon=${this.long}`);
            
            this.forecast = forecast.data.list;
        }catch(error){
            console.log("error");
            
            clearLoader();
            const errorMarkup = `
            <div class="error__handler">
                <img src="img/error.svg" alt="Error Image" class="error__handler--img">
                <p class="error__handler--text">Oh oh.. Please try again</p>
            </div>`;
            elements.forecastList.insertAdjacentHTML("afterbegin", errorMarkup);
        }
    }
};
