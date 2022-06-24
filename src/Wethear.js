import './App.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wethear() {
  const API_KEY = '39622b8ea57649f582680206222206';
  const [search, setSearch] = useState('Quảng Ninh');
  const [data, setData] = useState({});
  const [time, setTimes] = useState('');
  const [bgContent, setBgContent] = useState(`url('https://source.unsplash.com/1920x1080/?${search}') no-repeat center/cover`);
  const [forecastHour, setForecastHour] = useState([]);
  
  useEffect(() => {
    getWethear();
    setSearch('');
    setLiveTime();
    setInterval(() => setLiveTime(), 60000);
  }, [])

  // function set live hour:minute
  const setLiveTime = () => {
    const liveTime = new Date();
    setTimes(liveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
  
  //function call API weather
  const callAPI = async () => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${search}&days=10&aqi=yes&alerts=yes&lang=vi`);
    const inforWethear = await response.json();
    return inforWethear;
  };

  //function get icon 
  const getIcon = (codeIcon, isDay) => {
    var pathIcon = './img/sun.png';
    if (codeIcon === 1000) {
      isDay === 1 ? pathIcon = './img/sun.png' : pathIcon = './img/clear.png'
    }
    if ([1003, 1006].includes(codeIcon)) {
      pathIcon = './img/cloudy.png'
    }
    if ([1009, 1030, 1135, 1147].includes(codeIcon)) {
      pathIcon = './img/mist_overcast.png'
    }
    if ([1189, 1192, 1195, 1201, 1243, 1246, 1252].includes(codeIcon)) {
      pathIcon = './img/rainy_pitchy.png'
    }
    if ([1066, 1207, 1216, 1219, 1222, 1225, 1258, 1282].includes(codeIcon)) {
      pathIcon = './img/snow_pitchy.png'
    }
    if ([1069, 1204, 1255, 1279].includes(codeIcon)) {
      pathIcon = './img/sleet_snow.png'
    }
    if ([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1198, 1240, 1249].includes(codeIcon)) {
      pathIcon = './img/rain.png'
    }
    if (codeIcon === 1087) {
      pathIcon = './img/storm.png'
    }
    if ([1114, 1117].includes(codeIcon)) {
      pathIcon = './img/snow-storm-blizzad.png'
    }
    if ([1210, 1213].includes(codeIcon)) {
      pathIcon = './img/snow_light.png'
    }
    if ([1237, 1261, 1264].includes(codeIcon)) {
      pathIcon = './img/ice_rain.png'
    }
    if ([1273, 1276].includes(codeIcon)) {
      pathIcon = './img/ice_rain.png'
    }
    return pathIcon;
  }

  //function get data weather
  const getWethear = () => {
    callAPI()
      .then((response) => {
        if (response.error) {
          //notice when call API failed
          if (response.error.code === 1003) {
            toast.warn('Vui Lòng Nhập Tên Một Thành Phố Hoặc Tỉnh Ở Việt Nam');
          } else if (response.error.code === 1006) {
            toast.warn('Không Tìm Thấy Thành Phố Hoặc Tỉnh Này');
          }
        } else {
          const dayOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy',];
          const day = dayOfWeek[new Date().getDay()];
          const date = new Date().getDate();
          const month = new Date().getMonth();
          const year = new Date().getFullYear();
          const fullDate = `${day}, ngày ${date} tháng ${month} năm ${year}`;

          let codeIcon = response.current.condition.code;
          let pathIcon = getIcon(codeIcon, response.current.is_day);
          let iconWeather = require(`${pathIcon}`);

          // set current data weather from response API
          setData({
            temperature: response.current.temp_c,
            city: search,
            humidity: response.current.humidity,
            uv: response.current.uv,
            cloud: response.current.cloud,
            description: response.current.condition.text,
            icon: iconWeather,
            date: fullDate,
            error: '',
          });

          // set Forecast Hour weather from response API
          setForecastHour([]);
          let forecastDailyArr = response.forecast.forecastday[0].hour.concat(response.forecast.forecastday[1].hour)
          forecastDailyArr.forEach((element, index) => {
            let codeIconHours = element.condition.code;
            let pathIconHours = getIcon(codeIconHours, element.is_day);

            let iconWeatherHour = require(`${pathIconHours}`);
            let hours = new Date().getHours();
            if (index > hours) {
              setForecastHour(prev => {
                return [...prev, {
                  hour: element.time,
                  icons: iconWeatherHour,
                  temperature: element.temp_c,
                  description: element.condition.text
                }]
              })
            }
          });

          setBgContent(`url('https://source.unsplash.com/960x540/?${search}') no-repeat center/cover`);

          setSearch('');
        }
      })
  }
  return (
    <div
      className="content"
      style={{
        background: bgContent
      }}
    >
      <div className="blur"></div>
      <div className="search-place">
        <input
          className="search"
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <button
          className="btn-search"
          onClick={getWethear}
        >
          <img src={require('./img/search.png')} alt="Search" />
        </button>
      </div>
      <div className="mainday">
        <div className="mainday-desc">
          <h1 className="place">{data.city}</h1>
          <h4 className="date">{data.date}</h4>
          <h2 className="hour">
            {
              time
            }
          </h2>
        </div>
        <div className="icon-mainday info-wethear">
          <img src={data.icon} alt="Sun" />
        </div>
        <div className="day-wethear info-wethear">
          <h2 className="mainday-temp">{data.temperature} &deg; C</h2>
          <h4 className="wethear-desc">{data.description}</h4>
          <h4 className="wethear-humidity">Độ ẩm: {data.humidity}%</h4>
          <h4 className="wethear-uv">Chỉ số UV: {data.uv}</h4>
          <h4 className="wethear-cloud">Tỉ lệ mây che phủ: {data.cloud}</h4>
        </div>
      </div>
      <div className="nextdays">
        {
          forecastHour.map((value, i) => {
            if (i < 5) {
              return (
                <div className="nextday-info" key={i}>
                  <h2 className="hourforecast">{value.hour.slice(11)}</h2>
                  <div className="icon">
                    <img src={value.icons} alt="Icon" />
                    {/* <img alt="Icon" /> */}
                  </div>
                  <h2 className="temp">{value.temperature} &deg;</h2>
                  <div className="desc">
                    <p>{value.description}</p>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
      <ToastContainer style={{ zIndex: 9999999 }} />
    </div>
  );
}

export default Wethear;