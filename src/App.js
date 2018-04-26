import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import SplashView from "./ui/views/SplashView";
import LoginView from "./ui/views/LoginView";
import HomeView from "./ui/views/HomeView";

class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/splash" component={SplashView} />
				<Route path="/signup" component={LoginView} />
				<Route path="/home" component={HomeView} />
			</Switch>
		);
	}
}

export default App;
