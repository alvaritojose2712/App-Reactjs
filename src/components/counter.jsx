import React, { Component } from 'react';

class Counter extends Component {
	render(){
		const {onIncrementar,counter,onBorrar} = this.props 
		return (
			<div>
				<span className={this.badge()}>{this.formatCount()}</span>
				<button 
					onClick={() => onIncrementar(counter)} 
					className='btn btn-dark btn-sm'>
					Incrementar				
				</button>
				<button 
					onClick={() => onBorrar(counter.id)} 
					className='btn btn-danger btn-sm m-2'>
					Borrar
				</button>		
			</div>
		);
	}
	formatCount = () => {
		const { value } = this.props.counter
		return value===0 ? "cero" : value
	}
	badge = () => {
		let clases = 'badge m-2 badge-'
		clases += (this.props.counter.value===0) ? "warning" : "primary"
		return clases
	}
}
export default Counter; 