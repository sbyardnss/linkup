import { Outlet, Route, Routes } from "react-router-dom"
import { AddCourseForm } from "../Courses/AddCourseForm"
import { HomePage } from "../HomePage/HomePage"
import { UserProfile } from "../Profile/UserProfile"
import { TeeTimeForm } from "../TeeTimeForm/TeeTimeForm"
import { UserList } from "../UserList/UserList"
import { HoleScore } from "./Scoring/HoleScore"
import { Scorecard } from "./Scoring/Scorecard"
import { ScorecardProvider } from "./Scoring/ScorecardContext"
import { ScorecardList } from "./Scoring/ScorecardList"

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
				<Route path="" element={<HomePage />} />

				<Route path="scorecards/:scorecardId" element={
					<ScorecardProvider>
						<Scorecard />
					</ScorecardProvider>
				} />
				<Route path="holeScore" element={
					<ScorecardProvider>
						<HoleScore />
					</ScorecardProvider>
				} />

				<Route path="profile" element={<UserProfile />} />
				<Route path="userList" element={<UserList />} />
				<Route path="addCourse" element={<AddCourseForm />} />
				<Route path="createTeeTime" element={<TeeTimeForm />} />




			</Route>
		</Routes>
	)
}