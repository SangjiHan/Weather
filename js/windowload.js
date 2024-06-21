window.onload = function() {
    let areaList = ['seoul', 'Incheon', 'Namyangju', 'Yongin', 'gangneung', 'chuncheon', 'wonju', 'cheongju', 'cheonan', 'daejeon', 'sejong', 'gwangju', 'suncheon', 'jeonju', 'pohang', 'andong', 'daegu', 'busan', 'ulsan', 'Jinju', 'jeju'];

    function getKoreanName(cityName) {
        let koreanName = '';

        switch (cityName.toLowerCase()) {
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
            case 'cheonan':
                koreanName = '천안';
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
            case 'pohang':
                koreanName = '포항';
                break;
            case 'andong':
                koreanName = '안동';
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
            default:
                koreanName = cityName; // Use the default value if no match is found
        }

        return koreanName;
    }

    function loadWeather(cityName) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4d1d3d545226f90460923b749c610c2e`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(`Weather data for ${cityName}:`, data);
                const koreanName = getKoreanName(cityName);
                const temperature = (data.main.temp / 10).toFixed(1);
                const areaDiv = document.getElementById(cityName);
                
                if (areaDiv) {
                    areaDiv.innerHTML = `
                        
                        <p>${temperature}°C</p>
                        <h3>${koreanName}</h3>
                    `;
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    areaList.forEach(cityId => {
        loadWeather(cityId);
    });
};