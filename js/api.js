function fetchData(value) {
  console.log(value);

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

      console.log(presentWeather);
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
      humidity.innerHTML = '습도 &nbsp;&nbsp;' + (presentWeather.main.humidity) +' %';

      //바람 
      const wind = document.getElementById("windArea");
      windArea.innerHTML = '바람 &nbsp;&nbsp;' + presentWeather.wind.speed + 'm' + '&#47;' +'s';
    })
    .catch(error => console.error('Error fetching data:', error));
}