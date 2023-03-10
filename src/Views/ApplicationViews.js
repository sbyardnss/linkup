import { Outlet, Route, Routes } from "react-router-dom"
import { AddCourseForm } from "../Courses/AddCourseForm"
import { HomePage } from "../HomePage/HomePage"
import { TeeTimeForm } from "../TeeTimeForm/TeeTimeForm"
import { UserList } from "../UserList/UserList"
import { WeatherProvider } from "../Weather/WeatherProvider"

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

				<Route path="" element={
					<WeatherProvider>

						<HomePage />
					</WeatherProvider>
				} />
				<Route path="userList" element={<UserList />} />
				<Route path="addCourse" element={<AddCourseForm />} />
				<Route path="createTeeTime" element={
					<WeatherProvider>
						<TeeTimeForm />
					</WeatherProvider>
				} />




			</Route>
		</Routes>
	)
}