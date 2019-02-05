import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Countersapp from './components/countersApp/app';
import Reduxapp from './components/reduxApp/app';
import txt from './components/txt/app';



class App extends Component{
	render(){
		return (
			<Router>
				<Switch>
					<Route path="/counter" component={Countersapp}/>
					<Route path="/redux" component={Reduxapp}/>
					<Route path="/txtGenerator" component={txt}/>
				</Switch>
			</Router>

		)
	}
}
ReactDOM.render(<App/>,document.getElementById("root"))	  