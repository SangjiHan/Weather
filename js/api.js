function fetchData(value) {
  console.log(value);
  const check = document.getElementById("weatherImg");

  console.log(check)
  check.innerHTML = '';

  const hourlyWeathercontainer = document.getElementById("hourlyWeather");
  hourlyWeathercontainer.innerHTML = '';
  console.log(hourlyWeathercontainer);

  const dailyWeathercontainer = document.getElementById("dailyWeather");
  dailyWeathercontainer.innerHTML = '';
  console.log(dailyWeathercontainer);

  const urls = [
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=4d1d3d545226f90460923b749c610c2e`,
    `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=4d1d3d545226f90460923b749c610c2e`,
  ];

  // 지역별 한국어 이름 매핑
  let koreanName = '';
    switch (value.toLowerCase()) {
        case 'seoul':
            koreanName = '서울';
            break;
        case 'incheon':
            koreanName = '인천';
            break;
        case 'namyangju':
            koreanName = '남양주';
            break;
        case 'yongin':
            koreanName = '용인';
            break;
        case 'gangneung':
            koreanName = '강릉';
            break;
        case 'chuncheon':
            koreanName = '춘천';
            break;
        case 'wonju':
            koreanName = '원주';
            break;
        case 'cheongju':
            koreanName = '청주';
            break;
        case 'chungju':
            koreanName = '충주';
            break;
        case 'cheonan':
            koreanName = '천안';
            break;
        case 'gongju':
            koreanName = '공주';
            break;
        case 'daejeon':
            koreanName = '대전';
            break;
        case 'sejong':
            koreanName = '세종';
            break;
        case 'gwangju':
            koreanName = '광주';
            break;
        case 'suncheon':
            koreanName = '순천';
            break;
        case 'jeonju':
            koreanName = '전주';
            break;
        case 'yeosu':
            koreanName = '여수';
            break;
        case 'pohang':
            koreanName = '포항';
            break;
        case 'andong':
            koreanName = '안동';
            break;
        case 'gyeongju':
            koreanName = '경주';
            break;
        case 'daegu':
            koreanName = '대구';
            break;
        case 'busan':
            koreanName = '부산';
            break;
        case 'ulsan':
            koreanName = '울산';
            break;
        case 'jeju':
            koreanName = '제주도';
            break;
        case 'ulleungdo-dokdo':
            koreanName = '울릉도/독도';
            break;
        default:
            koreanName = value; // Use the default value if no match is found
    }

  // 각각의 API 요청을 fetch하여 Promise 배열 생성
  const data = urls.map(url => fetch(url).then(response => response.json()));

  // Promise.all을 사용하여 모든 데이터가 준비될 때까지 기다림
  Promise.all(data)
    .then(dataArray => {
      const [presentWeatherList, hourlyWeatherList] = dataArray;

      
      console.log(hourlyWeatherList);

      
      //한국 지역명 
      const areaTitle = document.getElementById("areaTitle");
      areaTitle.textContent = koreanName; 

      //현재 기온
      const presentTempArea = document.getElementById("presentTempArea");
      presentTempArea.innerHTML = (presentWeatherList.main.temp/ 10).toFixed(1);

      // 체감 온도
      const feelslike = document.getElementById("feelslikeArea");
      feelslike.innerHTML = '체감&nbsp;(' + (presentWeatherList.main.feels_like / 10).toFixed(1) +')';

      //습도 
      const humidity = document.getElementById("humidityArea");
      humidity.innerHTML = '습도 &nbsp' + (presentWeatherList.main.humidity) +' %';

      //바람 
      const wind = document.getElementById("windArea");
      windArea.innerHTML = '바람 &nbsp' + presentWeatherList.wind.speed + 'm' + '&#47;' +'s';

      //아이콘
      console.log(presentWeatherList);
      console.log(presentWeatherList.weather[0].icon);
      const weatherIconArea = document.getElementById("weatherImg");
      const weatherIcon = document.createElement("img");
      
     
      weatherIcon.src = 'image/' + presentWeatherList.weather[0].icon + '.png';
      weatherIconArea.appendChild(weatherIcon);


      const hourlyWeatherArray = [];

      for (let i = 0; i < 12; i++) {
        const date = new Date(hourlyWeatherList.list[i].dt_txt);
        const iconUrl = hourlyWeatherList.list[i].weather[0].icon;  

        const temp = hourlyWeatherList.list[i].main.temp;
        hourlyWeatherArray.push({ date, iconUrl, temp });
      }

      console.log(hourlyWeatherArray);

      function formatDateDay(date) {
        const day = date.getDate(); // 날짜 (일)
      
        return `${day}일`;
      }

      function formatDateHour(date) {
        const hour = date.getHours(); // 시간
      
        // 오전, 오후
        const period = hour >= 12 ? '오후' : '오전';
        const displayHour = hour % 12 || 12; 
      
        return `${period} ${displayHour} 시 `;
      }

      // 결과 호출 
      hourlyWeatherArray.forEach(item => {
        const hourlyWeatherarea = document.getElementById("hourlyWeather");
        console.log(hourlyWeatherarea);

        //시간대 별 아이콘 송출
        const container = document.createElement("div");
        container.id = "dayHourContainer";
        const img = document.createElement('img');
        
        img.src = `image/${item.iconUrl}.png`; 
        img.alt = 'Weather Icon'; 
        
        container.appendChild(img); 

        //시간대 별 기온 송출
        const tempSpan = document.createElement("span");
        tempSpan.id = "hourlyWeatherTemp";
        const temp = item.temp;
        tempSpan.textContent = (temp/10).toFixed(1);
        container.appendChild(tempSpan);

        // 줄바꿈(br) 요소 추가
        container.appendChild(document.createElement('br'));


        //시간대 별 시간 송출
        const day = document.createElement('span');
        day.id = "hourlyWeatherDay";
        const formatDay = formatDateDay(item.date);
        day.textContent = formatDay; // innerHTML 대신 textContent 사용
        container.appendChild(day);

        // 줄바꿈(br) 요소 추가
        container.appendChild(document.createElement('br'));

        // 시간 포맷팅 함수 호출하여 포맷된 시간(hour) 생성 및 추가
        const hour = document.createElement('span');
        hour.id = "hourlyWeatherHour";
        const formatHour = formatDateHour(item.date);
        hour.textContent = formatHour;
        container.appendChild(hour);

        // 최종적으로 출력
        hourlyWeatherarea.appendChild(container);
      });




      //데일리 날씨

      const today = new Date();
      console.log(today);

      const hour = ('0' + today.getHours()).slice(-2); 
      console.log(hour);

      let selectHour = 0; 
      //일치하는 시간대
      switch (Math.floor(hour / 3)) {
          case 1:
              selectHour = 3;
              break;
          case 2:
              selectHour = 6;
              break;
          case 3:
              selectHour = 9;
              break;
          case 4:
            selectHour = 12;
            break;
          case 5:
            selectHour = 15
          case 6:
            selectHour = 18;
            break;
          case 7:
            selectHour = 21;
            break;
          case 8:
            selectHour = 24;
            break;
          default:
              selectHour = 0; 
      }

      console.log(selectHour);


      const selectHourArray = [];

      for (let i = 0; i < 40; i++) {
        const date = new Date(hourlyWeatherList.list[i].dt_txt);
        const hour = ('0' + date.getHours()).slice(-2);
        const iconUrl = hourlyWeatherList.list[i].weather[0].icon;
        const temp = hourlyWeatherList.list[i].main.temp;
        let context;
      
        switch (selectHourArray.length) {
          case 0:
            context = "오늘";
            break;
          case 1:
            context = "내일";
            break;
          case 2:
            context = "모레";
            break;
          case 3:
            context = "글피";
            break;
          default:
            context = ""; // 예외 처리를 위한 기본값 설정
            break;
        }
      
        if (hour == selectHour && selectHourArray.length < 4) {
          selectHourArray.push({ date, iconUrl, temp, context });
        }
      
        if (selectHourArray.length === 4) {
          break;
        }
      }
      
      console.log(selectHourArray);
      
      selectHourArray.forEach(item => {
        const dailyWeatherArea = document.getElementById("dailyWeather");
        console.log(dailyWeatherArea);

        const container = document.createElement("div");
        container.id = "dayHourContainer";

        // 날짜 글씨 송출
        const contextSpan = document.createElement("span");
        contextSpan.id = "dailyWeatherContext"
        contextSpan.textContent = item.context;
        container.appendChild(contextSpan);

        
        //시간대 별 아이콘 송출
        const img = document.createElement('img');
        
        img.src = `image/${item.iconUrl}.png`; 
        img.alt = 'Weather Icon'; 
        
        container.appendChild(img); 

        //시간대 별 기온 송출
        const tempSpan = document.createElement("span");
        tempSpan.id = "dailyWeatherTemp";
        const temp = item.temp;
        tempSpan.textContent = (temp/10).toFixed(1);
        container.appendChild(tempSpan);

        // 줄바꿈(br) 요소 추가
        container.appendChild(document.createElement('br'));


        //시간대 별 시간 송출
        const day = document.createElement('span');
        day.id = "dailyWeatherDay";
        const formatDay = formatDateDay(item.date);
        day.textContent = formatDay; // innerHTML 대신 textContent 사용
        container.appendChild(day);

        // 줄바꿈(br) 요소 추가
        container.appendChild(document.createElement('br'));

        // 시간 포맷팅 함수 호출하여 포맷된 시간(hour) 생성 및 추가
        const hour = document.createElement('span');
        hour.id = "dailyWeatherHour";
        const formatHour = formatDateHour(item.date);
        hour.textContent = formatHour;
        container.appendChild(hour);

         // 줄바꿈(br) 요소 추가
         container.appendChild(document.createElement('br'));

        

        dailyWeatherArea.appendChild(container);
      });
      

    })
    .catch(error => console.error('Error fetching data:', error));

  }


/*
 hourlyWeatherArray.forEach(item => {
        const hourlyWeatherarea = document.getElementById("hourlyWeather");
        console.log(hourlyWeatherarea);

        //시간대 별 아이콘 송출
        const container = document.createElement("div");
        container.id = "dayHourContainer";
        const img = document.createElement('img');
        
        img.src = `image/${item.iconUrl}.png`; 
        img.alt = 'Weather Icon'; 
        
        container.appendChild(img); 

        //시간대 별 기온 송출
        const tempSpan = document.createElement("span");
        tempSpan.id = "hourlyWeatherTemp";
        const temp = item.temp;
        tempSpan.textContent = (temp/10).toFixed(1);
        container.appendChild(tempSpan);

        // 줄바꿈(br) 요소 추가
        container.appendChild(document.createElement('br'));
*/