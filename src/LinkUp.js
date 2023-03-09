// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Footer } from "./nav/Footer"
import { NavBar } from "./nav/NavBar"
import { NavBarProvider } from "./nav/NavBarContext"
// import { NavBar } from "./nav/Navbar"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"
// import { FilterContext } from "./Nav/NavbarContext"


export const LinkUp = () => {
	return <Routes>
		<Route path="/login" element={<Login key="loginPath" />} />
		<Route path="/register" element={<Register key="registerPath" />} />

		<Route key="authContextPath" path="*" element={
			<>
				{/* <Authorized > */}
					{/* <NavBarProvider> */}
						<NavBar />
						<ApplicationViews />
					{/* </NavBarProvider> */}

				{/* </Authorized> */}
			</>

		} />
	</Routes>
}
export default LinkUp