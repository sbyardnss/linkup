import { useState, useEffect, createContext } from "react";
import { getWeatherInfo } from "../ServerManager";


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
    const weatherHourArrayForIndex = weather14Day.hourly?.time
    // const testParse = Date.parse(testHour)
    // console.log(testParse)
    // console.log(testHour)
    // const testTeeTimeTime = "2023-03-28T12:00"
    // const parsedTestTeeTime = Date.parse(testTeeTimeTime)
    // console.log(parsedTestTeeTime)
    const hourlyWindspeed = weather14Day.hourly?.windspeed_10m
    // console.log(hourlyWindspeed)//works

    const hourlyTemp = weather14Day.hourly?.temperature_2m
    // console.log(hourlyTemp)//works

    const hourlyPrecipitation = weather14Day.hourly?.precipitation_probability
    // console.log(weather14Day)//works
    return (
        <WeatherContext.Provider value={{
            weather14Day, rainChance14Day, next14Dates, weatherHourArrayForIndex,
            hourlyWindspeed, hourlyTemp, hourlyPrecipitation
        }}>
            {props.children}
        </WeatherContext.Provider>
    )

}