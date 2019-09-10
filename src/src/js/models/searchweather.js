import axios from "axios";

import { proxy, key } from "../config";
import { elements, clearLoader } from "../views/base";



/**
 * GEt CURRENT POSITION
 */





export default class Search{
    constructor(query){
        this.query = query;
    }

    async getSearchWeather(){
        try{
            const data = await axios (`${proxy}https://api.openweathermap.org/data/2.5/weather?q=${this.query}&appid=${key}&units=metric`);

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

    async getSearchForecast(){
        try{
            var forecast = await axios (`${proxy}https://api.openweathermap.org/data/2.5/forecast?q=${this.query}&appid=${key}&units=metric`);
            
            this.forecast = forecast.data.list;
        }catch(error){
            console.log(error);
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
