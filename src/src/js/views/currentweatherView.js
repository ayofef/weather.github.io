import { elements } from "./base";



const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

const date = new Date();
const disMonth = date.getMonth();
const disDay = date.getDate();
const disTime = date.toTimeString().split(":");


export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = "";

export const clearCurrentData = () =>{
    elements.currentWeatherBox.innerHTML = "";
    elements.forecastList.innerHTML = "";
    elements.forecastButton.innerHTML = "";
};

export const clearForecastList = () =>{
    elements.forecastList.innerHTML ="";
    elements.forecastButton.innerHTML = "";
};

export const renderCurrentWeather = (result) =>{
    const markup = `
        <div class="current__header">
            <div class="current__header--text">
                <p class="current__header--location">
                    ${result.data.name},${ result.data.sys.country}
                </p>
                <p class="current__header--description">
                ${result.data.weather[0].main}
                </p>
            </div>
            
            <div class="current__header--icon">
                <i class="owf owf-${result.data.weather[0].id} owf-5x"></i>
            </div>
        </div>
                
        <div class="current__body">
            <p class="current__tempreature">${Math.ceil(result.data.main.temp)}°c</p>
            <div class="current__details">
                <p class="current__details--heading">
                            Details
                </p>
                <ul>
                    <li class="current__wind">
                        <span class="current__details--key">Wind:</span> ${result.data.wind.deg} m/s
                    </li>
                    <li class="current__humidity">
                        <span class="current__details--key">Humidity:</span> ${result.data.main.humidity}%
                    </li>
                    <li class="current__pressure">
                                    <span class="current__details--key">Pressure:</span> ${result.data.main.pressure} hPa
                    </li>
                </ul>
            </div>
        </div>
                
        <div class="current__footer">
            <p class="current__highsandlow">
                <span class="current__low">${Math.ceil(result.data.main.temp_min)}°c </span>
                    ·
                <span class="current__high">${Math.ceil(result.data.main.temp_max)}°c</span>
            </p>
            
            <p class="current__date">
                <span class="current__time">${disTime[0]} : ${disTime[1]} </span>
                <span class="current__month">&nbsp; ${months[disMonth]} ${disDay}</span>
            </p>
        </div>
    
    `;
    elements.currentWeatherBox.insertAdjacentHTML("afterbegin", markup);
}

const renderForecast = (forecast) =>{
    
    const rawDate = forecast.dt_txt.split(" ");
    const rawDateDay = rawDate[0].split("-");
    const rawDateTime = rawDate[1].split(":");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const processedDay =`${rawDateDay[2]},\u00A0 ${months[parseInt(rawDateDay[1], 10) - 1]}.\u00A0 ${rawDateDay[0]}`;
    const processedTime = `${rawDateTime[0]}:${rawDateTime[1]}`;

    const processedDate =`${processedDay}\u00A0\u00A0\u00A0\u00A0${processedTime}`;

    

    const markup = `
    
    <li>
    <p class="forcast__time">${processedDate}</p>
        <div class="forecast__details">
            <div class="forecast__deatail--highslow">
                <div class="forecast__details--icon">
                    <i class="owf owf-${forecast.weather[0].id} owf-5x"></i>
                </div>
                <p class="forecast__details--specifics">${forecast.weather[0].main}<br><span class="forecast__temperatures">${Math.ceil(forecast.main.temp_min)}°c · ${Math.ceil(forecast.main.temp_max)}°c</span></p>
            </div>
            <div class="forcast__temp">${Math.ceil(forecast.main.temp)}°c </div>
        </div>
    </li>
    `;

    elements.forecastList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) =>{
    if(type ==="prev"){
        return `
        <div class="${type} btn" data-goto=${type === "prev" ? page - 1 : page + 1}>
        <img src="img/${type === "prev" ? "left" : "right"}.svg" alt="${type} button" class="btn__icon svg">     
        <p>Page ${type === "prev" ? page - 1 : page + 1}</p>  
        </div>
        `;
    }else{
        return `
        <div class="${type} btn" data-goto=${type === "prev" ? page - 1 : page + 1}>
        <p>Page ${type === "prev" ? page - 1 : page + 1}</p>
        <img src="img/${type === "prev" ? "left" : "right"}.svg" alt="${type} button" class="btn__icon svg">       
        </div>
        `;
    }
};

const renderButtons = (page, numResults, resPerPage) =>{
    const pages = Math.ceil(numResults/resPerPage);

    let button;

    if(page === 1 && pages > 1){
        button = createButton(page, "next");

    }else if(page < pages){

        button =`
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `;

    }else if(page === pages && pages > 1){
        button = createButton(page, "prev");
    }

    elements.forecastButton.insertAdjacentHTML("afterbegin", button);

};
export const renderList = (forecast, page = 1, resPerPage = 8) =>{

    //dividing the result into pages
    var start = (page - 1) * resPerPage;

    var end = page * resPerPage;

    forecast.slice(start, end).forEach(el => renderForecast(el));

    //render pagination buttons
    renderButtons(page, forecast.length, resPerPage);

};

