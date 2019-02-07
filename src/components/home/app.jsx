import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

class App extends Component{
	render(){
		return (
			<div className="btn-group w-100">
				<Link className="btn btn-outline-primary" to="/txtGenerator">Generador de TXT</Link>
				<Link className="btn btn-outline-warning" to="/counter">Counter App</Link>
				<Link className="btn btn-outline-info" to="/redux">Redux</Link>
			</div>	
		)
	}
}
export default App;
