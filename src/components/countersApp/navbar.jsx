import React from 'react';


const Navbar = ({counterNum}) => {
	return (
		<nav className="navbar navbar-light bg-light">
		  <button className="navbar-brand" href="#">
		  	<h1> Número de contadores: <span className='badge badge-primary'>{counterNum}</span></h1>
		  </button>
		  <button className="navbar-brand">
			Simple_App - ReactJS
		  </button>
		</nav>
	)
}

export default Navbar;
