import { Outlet, Route, Routes } from "react-router-dom"
import { AddCourseForm } from "../Courses/AddCourseForm"
import { HomePage } from "../HomePage/HomePage"
import { UserProfile } from "../Profile/UserProfile"
import { TeeTimeForm } from "../TeeTimeForm/TeeTimeForm"
import { UserList } from "../UserList/UserList"
import { HoleScore } from "../Scoring/HoleScore"
import { Play } from "../Scoring/Play"
import { Scorecard } from "../Scoring/Scorecard"
import { ScorecardProvider } from "../Scoring/ScorecardContext.js"
import { MessageThread } from "../Messages/MessageThread"

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
				<Route path="play" element={
					<ScorecardProvider>
						<Play />
					</ScorecardProvider>
				} />

				<Route path="profile" element={
					<ScorecardProvider>
						<UserProfile />
					</ScorecardProvider>
				} />
				<Route path="userList" element={<UserList
					contingentId="fullUserList"
					contingentContainer="userListContainer"
					contingentList="listOfOtherUsers"
				/>} />
				<Route path="addCourse" element={<AddCourseForm />} />
				<Route path="createTeeTime" element={<TeeTimeForm />} />
				<Route path="messages" element={<MessageThread />} />





			</Route>
		</Routes>
	)
}