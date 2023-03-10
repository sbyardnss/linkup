import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "../HomePage/HomePage"
import { TeeTimeForm } from "../TeeTimeForm/TeeTimeForm"
import { UserList } from "../UserList/UserList"

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


					<Route path="" element={ <HomePage /> } />
                    <Route path="userList" element={ <UserList /> } />
					<Route path="createTeeTime" element={ <TeeTimeForm /> } />

					

			</Route>
		</Routes>
	)
}