import './App.css';
import {useState} from "react";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import moment from "moment";

export const API_WEATHER_KEY = 'a703f52f79f6cf49459bb51d48b9183c'

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const handleCityNameChange = (e) => {
        setCity(e.target.value)
    }
    const onSubmitForm = (e) => {
        e.preventDefault()
        getCoordinateByCityName()
    }
    const getCoordinateByCityName = () => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_WEATHER_KEY}`)
            .then(r => r.json())
            .then(res => {

                const cityData = res[0];
                const {lat, lon} = cityData;
                getWeatherByCoordinates(lat, lon)
            })
    }

    const getWeatherByCoordinates = (lat, lon) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_WEATHER_KEY}`)
            .then(r => r.json())
            .then(res => {
                setWeather(res)
            //    feels_like
            //    temp
            //    temp_max
            //    temp_min
            })
    }
    console.log(weather)

    return (
        <div>
            <form onSubmit={onSubmitForm}>
                <TextField fullWidth={true} value={city} onChange={handleCityNameChange}
                           placeholder="Введите название города (англ.)" label="City" variant="outlined"/>


                <Button type={"submit"} style={{marginTop: 20}} variant="contained">Получить погоду</Button>

            </form>
            {weather ?
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Погода в {weather.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Ощущается как: {Math.ceil(weather.main.feels_like - 273.15)}gigC
                        </Typography>
                        <Typography variant="h5" component="div">
                            Текущая температура: {Math.ceil(weather.main.temp - 273.15)}C
                        </Typography>
                        <Typography variant="h5" component="div">
                            Восход солнца:{new Date(weather.sys.sunrise*1000).toLocaleTimeString()}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Закат солнца:{new Date(weather.sys.sunset*1000).toLocaleTimeString()}
                        </Typography>
                        <Typography variant="h5" component="div">
                            День недели: {moment().format('dddd')}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Дата: {moment().format('LL')}
                        </Typography>
                    </CardContent>
                </Card>
                : null}
        </div>

    );
}

export default App;
