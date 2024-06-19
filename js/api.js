function fetchData(value) {
  console.log(value);
  const check = document.getElementById("weatherImg");

  console.log(check)
  check.innerHTML = '';

  const container = document.getElementById("hourlyWeather");
  container.innerHTML = '';
  console.log(container);

  const urls = [
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=4d1d3d545226f90460923b749c610c2e`,
    `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=4d1d3d545226f90460923b749c610c2e`,
  ];

  // 지역별 한국어 이름 매핑
  let koreanName = '';
  switch (value) {
    case 'seoul':
      koreanName = '서울';
      break;
    case 'Incheon':
      koreanName = '인천';
      break;
    case 'Suwon':
      koreanName = '수원';
      break;
    case 'Yongin':
      koreanName = '용인';
      break;
    default:
      koreanName = value; // 기본적으로는 value 그대로 사용
  }

  let today = new Date();
  console.log(today);

  // 각각의 API 요청을 fetch하여 Promise 배열 생성
  const data = urls.map(url => fetch(url).then(response => response.json()));

  // Promise.all을 사용하여 모든 데이터가 준비될 때까지 기다림
  Promise.all(data)
    .then(dataArray => {
      const [presentWeather, todayWeather] = dataArray;

      
      console.log(todayWeather);
      //한국 지역명 
      const areaTitle = document.getElementById("areaTitle");
      areaTitle.textContent = koreanName; 

      //현재 기온
      const presentTempArea = document.getElementById("presentTempArea");
      presentTempArea.innerHTML = (presentWeather.main.temp/ 10).toFixed(1);

      // 체감 온도
      const feelslike = document.getElementById("feelslikeArea");
      feelslike.innerHTML = '체감&nbsp;(' + (presentWeather.main.feels_like / 10).toFixed(1) +')';

      //습도 
      const humidity = document.getElementById("humidityArea");
      humidity.innerHTML = '습도 &nbsp' + (presentWeather.main.humidity) +' %';

      //바람 
      const wind = document.getElementById("windArea");
      windArea.innerHTML = '바람 &nbsp' + presentWeather.wind.speed + 'm' + '&#47;' +'s';

      //아이콘
      console.log(presentWeather);
      console.log(presentWeather.weather[0].icon);
      const weatherIconArea = document.getElementById("weatherImg");
      const weatherIcon = document.createElement("img");
      
     
      weatherIcon.src = 'image/' + presentWeather.weather[0].icon + '.png';
      weatherIconArea.appendChild(weatherIcon);


      const hourlyWeatherArray = [];

      for (let i = 0; i < 12; i++) {
        const date = new Date(todayWeather.list[i].dt_txt);
        const iconUrl = todayWeather.list[i].weather[0].icon; // 예시로 아이콘 URL 가져오기

        hourlyWeatherArray.push({ date, iconUrl });
      }

      console.log(hourlyWeatherArray);

      function formatDateDay(date) {
        const day = date.getDate(); // 날짜 (일)
        //const hour = date.getHours(); // 시간
      
        // 오전, 오후
        /*const period = hour >= 12 ? '오후' : '오전';
        const displayHour = hour % 12 || 12; */
      
        return `${day}일`;
      }

      function formatDateHour(date) {
        const hour = date.getHours(); // 시간
      
        // 오전, 오후
        const period = hour >= 12 ? '오후' : '오전';
        const displayHour = hour % 12 || 12; 
      
        return `${period} ${displayHour} 시 `;
      }

      // 결과를 표시할 부모 요소 선택
      hourlyWeatherArray.forEach(item => {
        const hourlyWeatherarea = document.getElementById("hourlyWeather");
        console.log(hourlyWeatherarea);
        const container = document.createElement("div");
        container.id = "dayHourContainer";
        const img = document.createElement('img');
        
        img.src = `image/${item.iconUrl}.png`; 
        img.alt = 'Weather Icon'; 
        
        container.appendChild(img); 

        const day = document.createElement('span');
        day.id = "hourlyWeatherDay";
        const formatDay = formatDateDay(item.date);
        day.textContent = formatDay; // innerHTML 대신 textContent 사용
        container.appendChild(day);

        // 줄바꿈(br) 요소 추가
        const lineBreak = document.createElement('br');
        container.appendChild(lineBreak);

        // 시간 포맷팅 함수 호출하여 포맷된 시간(hour) 생성 및 추가
        const hour = document.createElement('span');
        hour.id = "hourlyWeatherHour";
        const formatHour = formatDateHour(item.date);
        hour.textContent = formatHour;
        container.appendChild(hour);

        // hourlyWeatherarea에 container 추가
        hourlyWeatherarea.appendChild(container);
      });

    })
    .catch(error => console.error('Error fetching data:', error));
}