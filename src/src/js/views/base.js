export const elements = {
    currentWeatherBox: document.querySelector(".current__box"),
    forecastList: document.querySelector(".forecast__list"),
    forecastButton: document.querySelector(".forecast__button"),
    searchInput: document.querySelector(".search__field"),
    searchButton: document.querySelector(".search__btn"),
    homeButton: document.querySelector(".header__logo"),
    locationIcon: document.querySelector(".location-shown"),
};

export const elementStrings = {
    loader: "loader",
};

export const renderLoader = (parent) =>{
    const loderElement = `
    <div class="${elementStrings.loader}"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
    `
    parent.insertAdjacentHTML("afterbegin", loderElement);
};

export const clearLoader = () =>{
    const load = document.querySelector(`.${elementStrings.loader}`);
    if(load){
        load.parentElement.removeChild(load);
    }
}
