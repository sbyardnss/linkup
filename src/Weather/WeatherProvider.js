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
    const hourlyWindspeed = weather14Day.hourly?.windspeed_10m
    // console.log(hourlyWindspeed)//works

    const hourlyTemp = weather14Day.hourly?.temperature_2m
    // console.log(hourlyTemp)//works

    const hourlyPrecipitation = weather14Day.hourly?.precipitation_probability
    // console.log(weather14Day)//works

    const weatherData = (dateInfo, timeInfo, datesForWeatherInfo) => {
        //build weather string here
        const dateTwoWeeksOut = Date.parse(next14Dates[13])
        const teeTimeDateParsed = Date.parse(dateInfo)                                  //DATE
        
        //build hourly weather string here
        const timeBuilder = (time) => {                                             //TIME
            let [hours, minutes, seconds] = time.split(":")
            if (parseInt(hours) < 12) {
                hours = parseInt(hours) + 12
            }
            return `T${hours}:00`
        }
        
        const dateString = datesForWeatherInfo                                           //DATESFORWEATHER
        const exactHourString = `${dateString}${timeBuilder(timeInfo)}`
        //find index number for hourly weather arrays
        const hourIndex = weatherHourArrayForIndex.findIndex(hour => hour === exactHourString)
        const precipitationHour = hourlyPrecipitation[hourIndex]//works
        const windHour = hourlyWindspeed[hourIndex]//works
        const tempHour = hourlyTemp[hourIndex]//works
        let weatherInfoString = ""
        let precipitationString = ""
        let windString = ""
        let tempString = ""
        if (precipitationHour !== null && precipitationHour !== undefined) {
            precipitationString = `Rain: ${precipitationHour}% chance`
        }
        else {
            precipitationString = " Precipitation data not yet available"
        }
        if (windHour !== null && windHour !== undefined) {
            windString = `WindSpeed: ${windHour}mph`
        }
        else {
            windString = "Wind data not yet available"
        }
        if (tempHour !== null && tempHour !== undefined) {
            tempString = `Temp: ${tempHour}°F`
        }
        else {
            tempString = "Temp data not yet available"
        }
    
        if (teeTimeDateParsed >= dateTwoWeeksOut || tempHour === null || windHour === null || precipitationHour === null) {
            weatherInfoString += "too early for weather data"
        }
        return [precipitationString, windString, tempString, weatherInfoString]
    }

    return (
        <WeatherContext.Provider value={{
            weather14Day, rainChance14Day, next14Dates, weatherHourArrayForIndex,
            hourlyWindspeed, hourlyTemp, hourlyPrecipitation, weatherData
        }}>
            {props.children}
        </WeatherContext.Provider>
    )

}