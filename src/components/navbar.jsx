import React, {Component} from 'react';


const Navbar = ({counterNum}) => {
	return (
		<nav className="navbar navbar-light bg-light">
		  <a className="navbar-brand" href="#">
		  	<h1> Número de contadores: <span className='badge badge-primary'>{counterNum}</span></h1>
		  </a>
		  <a className="navbar-brand">
			Simple_App - ReactJS
		  </a>
		</nav>
	)
}

export default Navbar;
