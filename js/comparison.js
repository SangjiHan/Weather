function comparison(value) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=4d1d3d545226f90460923b749c610c2e`)
    .then(res => res.json()) 
    .then(data => {
        comparisonTemp(data);
    })
    .catch(err => {
        console.error('Fetch Error:', err); 
    });

}

function comparisonTemp(data) {
    console.log(data);
    const mainArea = document.getElementById("presentTempArea");
    const mainAreaTemp = mainArea.innerText.slice(0, -2); 
    const subAreaTemp = (data.main.temp / 10).toFixed(1);
    const defTempAreaPlus = (mainAreaTemp - subAreaTemp).toFixed(1)
    const defTempAreaMinus = (subAreaTemp - mainAreaTemp).toFixed(1)

    const cityName = document.getElementById("areaTitle").innerText;

    const infoDef = document.getElementById("infoDef");
    infoDef.id = "infoDef";
    infoDef.innerHTML = '';
    const defTemp = document.createElement("div");
    defTemp.id = "defTemp";
    if (defTempAreaPlus < 0) {
        defTemp.innerHTML = `${cityName} 보다 ${defTempAreaMinus}°C 높습니다.`;
    } else if (defTempAreaPlus > 0) {
        defTemp.innerHTML = `${cityName} 보다 ${defTempAreaPlus}°C 낮습니다.`;
    } else {
        defTemp.innerHTML = "온도가 같습니다.";
    }

    const subTemp = document.createElement("div");
    subTemp.id = "subTemp";
    subTemp.innerHTML = subAreaTemp + "°C";

    const subIcon = document.createElement("img");
    subIcon.id = "subIcon";
    const subIconsrc = data.weather[0].icon;

    subIcon.src = "image/" + subIconsrc + ".png";
    subIcon.style.width = "80px";

    infoDef.appendChild(subIcon);
    infoDef.appendChild(subTemp);
    infoDef.appendChild(defTemp);
    
}