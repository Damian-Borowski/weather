const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = document.querySelector('.day');
const city = document.querySelector('.city');
const description = document.querySelector('.description');
const actualTemp = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind');
const actualPressure = document.querySelector('.pressure');
const actualCloudiness = document.querySelector('.cloudiness');
const actualHumidity = document.querySelector('.humidity');
const welcomeBox = document.querySelector('.welcome');
const tryBtn = document.querySelector('button');
const paramsBox = document.querySelector('.params');
const videoBg = document.querySelector('.my-video');
const line = document.querySelector('hr');
const nextDays = document.querySelector('.days');
const firstDay = document.querySelector('.one-icon');
const secondDay = document.querySelector('.two-icon');
const thirdDay = document.querySelector('.three-icon');
const fourthDay = document.querySelector('.four-icon');
const actualDate = new Date();
const start = 0;


const success = (position) => {
    const userPosition = position.coords;
    const userLatitude = userPosition.latitude;
    const userLongitude = userPosition.longitude;

    const hideInfo = () => {
        welcomeBox.style = `display: none`;
    }

    function getPosition() {
        const key = 'e27fbc5177d947b899a0eae4ac19759c';
        const getPosition = `https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${userLatitude}%2C+${userLongitude}&pretty=1&no_annotations=1`;
        fetch(getPosition).then(response => response.json()).then(data => {
            cityLocation = data.results[0].components.county;
            city.textContent = cityLocation;
        })
    }

    function getWeather() {
        const appId = 'f238c040cb51b9d7ad0a4983342f498c'
        const apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${userLatitude}&lon=${userLongitude}&units=metric&
    exclude={part}&appid=${appId}`;
        fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (data) {
            const weatherDescription = data.current.weather[0].description;
            const weatherPressure = data.current.pressure;
            const weatherTemperature = data.current.temp;
            const weatherHumidity = data.current.humidity;
            const weatherClouds = data.current.clouds;
            const weatherWind = data.current.wind_speed;
            actualPressure.textContent = `${weatherPressure} hPa`;
            actualTemp.textContent = `${Math.round(weatherTemperature)}\u00B0C`;
            description.textContent = weatherDescription;
            windSpeed.textContent = `${weatherWind} m/s`;
            actualHumidity.textContent = `${weatherHumidity} %`;
            actualCloudiness.textContent = `${weatherClouds} %`;
            /* icon instruction */
            const iconcode = data.current.weather[0].icon;
            const icon = `img/${iconcode}.svg`;
            const newIcon = document.createElement('img');
            newIcon.setAttribute('src', `${icon}`);
            document.querySelector('.icon').appendChild(newIcon);
            document.body.style = `background: linear-gradient(to top, #000046, #1cb5e0);`;
            document.querySelector('.logo').style = `display:none;`;
            paramsBox.style = `display:block`;
            videoBg.style = `opacity: .1`;
            line.style = `display: block`;
            nextDays.style = `display: inline-grid`;
            //Next days instructions
            const getFirstDay = (day, dayNumb) => {
                if (day + dayNumb == 1) {
                    return days[1];
                }
                if (day + dayNumb == 2) {
                    return days[2];
                }
                if (day + dayNumb == 3) {
                    return days[3];
                }
                if (day + dayNumb == 4) {
                    return days[4];
                }
                if (day + dayNumb == 5) {
                    return days[5];
                }
                if (day + dayNumb == 6) {
                    return days[6];
                }
                if (day + dayNumb == 7) {
                    return days[0];
                }
                if (day + dayNumb == 8) {
                    return days[1];
                }
                if (day + dayNumb == 9) {
                    return days[2];
                }
                if (day + dayNumb == 10) {
                    return days[3];
                }
            }
            //First Day
            const iconFirstDay = data.daily[0].weather[0].icon;
            const iconFirst = `img/${iconFirstDay}.svg`;
            const firstIcon = document.createElement('img');
            const firstTemp = `${Math.round(data.daily[0].temp.day)}\u00B0C`;
            let firstDate = 1;
            let oneDay = getFirstDay(actualDate.getDay(), firstDate);
            firstIcon.setAttribute('src', `${iconFirst}`);
            firstDay.appendChild(firstIcon);
            document.querySelector('.one-temperature').textContent = firstTemp;
            document.querySelector('.one-date').textContent = oneDay;
            //Second Day
            const iconSecondDay = data.daily[1].weather[0].icon;
            const iconSecond = `img/${iconSecondDay}.svg`;
            const secondIcon = document.createElement('img');
            const secondTemp = `${Math.round(data.daily[1].temp.day)}\u00B0C`;
            let secondDate = 2;
            let twoDay = getFirstDay(actualDate.getDay(), secondDate);
            secondIcon.setAttribute('src', `${iconSecond}`);
            secondDay.appendChild(secondIcon);
            document.querySelector('.two-temperature').textContent = secondTemp;
            document.querySelector('.two-date').textContent = twoDay;
            //Third Day
            const iconThirdDay = data.daily[2].weather[0].icon;
            const iconThird = `img/${iconThirdDay}.svg`;
            const thirdIcon = document.createElement('img');
            const thirdTemp = `${Math.round(data.daily[2].temp.day)}\u00B0C`;
            let thirdDate = 3;
            let threeDay = getFirstDay(actualDate.getDay(), thirdDate);
            thirdIcon.setAttribute('src', `${iconThird}`);
            thirdDay.appendChild(thirdIcon);
            document.querySelector('.three-temperature').textContent = thirdTemp;
            document.querySelector('.three-date').textContent = threeDay;
            //Fourth Day
            const iconFourthDay = data.daily[3].weather[0].icon;
            const iconFourth = `img/${iconFourthDay}.svg`;
            const fourthIcon = document.createElement('img');
            const fourthTemp = `${Math.round(data.daily[3].temp.day)}\u00B0C`;
            let fourthDate = 4;
            let fourDay = getFirstDay(actualDate.getDay(), fourthDate);
            fourthIcon.setAttribute('src', `${iconFourth}`);
            fourthDay.appendChild(fourthIcon);
            document.querySelector('.four-temperature').textContent = fourthTemp;
            document.querySelector('.four-date').textContent = fourDay;
        }).catch(error => console.log(error));
    }
    getWeather();
    getPosition();
    hideInfo();
}

const getDate = () => {
    const thisDay = days[actualDate.getDay()];
    /*const thisMonth = months[actualDate.getMonth()];   for project with months name */
    let thisMonth = actualDate.getMonth();
    const thisYear = actualDate.getUTCFullYear();
    const numberDay = actualDate.getUTCDate();

    if (thisMonth < 10) {
        thisMonth = `0${actualDate.getMonth()}`;
    }

    day.textContent = `Today, ${thisDay} ${numberDay}.${thisMonth}.${thisYear}`;
}

const showPosition = () => {
    const location = navigator.geolocation.getCurrentPosition(success);
}

tryBtn.addEventListener('click', startWeather = () => {
    showPosition();
    getDate();
})