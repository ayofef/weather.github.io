import Current from "./models/currentweather";
import Search from "./models/searchweather";
import * as currentView from "./views/currentweatherView";
import { elements, renderLoader, clearLoader } from "./views/base";

const state = {};

const controlCurrentLocationWeather = () => {
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    let success =  async (pos) => {
        let crd = pos.coords;

        const long = crd.longitude;
        const lat = crd.latitude;
    

        //render loader
        renderLoader(elements.currentWeatherBox);
        renderLoader(elements.forecastList);

        //insert long and lat in current weather query
        state.currentWeather = new Current(long, lat);
        

        try{
            
            //get result in backgriunds
            await state.currentWeather.getCurrentWeather();
            await state.currentWeather.getCurrentForecast();

            
            //allowing loader to stay on ui for a while
            setTimeout( () =>{
                //clear loader once we get result
                clearLoader();

                //display result in ui
                currentView.renderCurrentWeather(state.currentWeather.result);
                
            }, 100);

            setTimeout( () =>{
                clearLoader();
                //display forecast on ui
                currentView.renderList(state.currentWeather.forecast);
            }, 200)
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
    
    };

    let error = (err) =>{
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };
      
    navigator.geolocation.getCurrentPosition(success, error, options);
};

controlCurrentLocationWeather();

elements.forecastButton.addEventListener("click", e =>{
    const btn = e.target.closest(".btn");
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        currentView.clearForecastList();
        currentView.renderList(state.currentWeather.forecast, goToPage);
    }
});

const controlWeatherSearch = async () =>{
    const query = currentView.getInput();

    if(query){
        state.searchWeather = new Search(query);

        currentView.clearInput();
        currentView.clearCurrentData();
        //render loader
        renderLoader(elements.currentWeatherBox);
        renderLoader(elements.forecastList);

        try{
            //get result in backgriunds
            await state.searchWeather.getSearchWeather();
            await state.searchWeather.getSearchForecast();

            setTimeout( () =>{
                //clear loader once we get result
                clearLoader();

                //display result in ui
                currentView.renderCurrentWeather(state.searchWeather.result);
                
            }, 100);

            setTimeout( () =>{
                clearLoader();
                //display forecast on ui
                currentView.renderList(state.searchWeather.forecast);
            }, 200)

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

elements.searchButton.addEventListener("click", e =>{
    e.preventDefault();
    controlWeatherSearch();
});
elements.homeButton.addEventListener("click", () =>{
    currentView.clearCurrentData();
    controlCurrentLocationWeather();
});
elements.locationIcon.addEventListener("click", () =>{
    currentView.clearCurrentData();
    controlCurrentLocationWeather();
});