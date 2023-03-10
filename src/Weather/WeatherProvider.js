import { useState, useEffect, createContext } from "react";
import { getWeatherInfo } from "../ApiManager";


export const WeatherContext = createContext()

export const WeatherProvider = (props) => {
    const [weather14Day, setWeather14DayForecast] = useState([])

    useEffect(
        () => {
            getWeatherInfo()
                .then(
                    (data) => {
                        setWeather14DayForecast(data)
                    }
                )
        },
        []
    )
    const rainChance14Day = weather14Day.daily?.precipitation_probability_max
    const next14Dates = weather14Day.daily?.time
    // console.log(next14Dates)

    





    
    return (
        <WeatherContext.Provider value={{
            weather14Day, rainChance14Day, next14Dates
        }}>
            {props.children}
        </WeatherContext.Provider>
    )

}