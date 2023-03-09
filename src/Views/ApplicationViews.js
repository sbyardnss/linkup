import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "../HomePage/HomePage"

export const ApplicationViews = () => {
	

	return (
		<Routes>
			<Route path="/" element={
				<>
					<div id="mainHeader">
						

					</div>
					<Outlet />
				</>
			}>


					<Route path="/" element={ <HomePage /> } />
					

			</Route>
		</Routes>
	)
}