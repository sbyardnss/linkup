import { Route, Routes } from "react-router-dom"
import { Login } from "./Auth/Login"
import { Register } from "./Auth/Register"
import { NavBar } from "./Nav/NavBar"
import { ApplicationViews } from "./Views/ApplicationViews"
import { Authorized } from "./Authorized"
import { WeatherProvider } from "./Weather/WeatherProvider"
import "./index.css"
import { TeeTimeProvider } from "./TeeTime/TeeTimeProvider"
export const LinkUp = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="*" element={
			<>
				<Authorized >
					<WeatherProvider>
						<div id="fullsiteContainer">
							<TeeTimeProvider>
								<NavBar />
								<ApplicationViews id="applicationViewsContainer" />
							</TeeTimeProvider>
						</div>
					</WeatherProvider>
				</Authorized>
			</>
		} />
	</Routes>
}
export default LinkUp