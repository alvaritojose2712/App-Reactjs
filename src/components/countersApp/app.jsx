import React, {Component} from 'react';
import Counters from './counters';
import Navbar from './navbar';

class App extends Component{
	state = {
		counters: [
			{ id: 1, value: 0 },
			{ id: 2, value: 10 },
			{ id: 3, value: 20 },
			{ id: 4, value: 30 },
		],
		valAdd: "",
	};

	componentDidMount(){
	}
	manejadorBorrar = (id) => {
		let counters = this.state.counters.filter(c => c.id!==id )
		this.setState({ counters })
	}
	manejarIncremento = (counter) => {
		let counters = this.state.counters
		let i = counters.indexOf(counter)
		counters[i].value+=1
		this.setState({ counters })
	}
	manejadorReiniciar = () => {
		let counters = this.state.counters.map(c => {
			c.value = 0
			return c 
		})
		this.setState({counters})
	}
	manejadorAgregar = () => {
		
		let {valAdd, counters} = this.state
		if (valAdd) {
			let countersNew = counters;
			let i = countersNew.length;
			countersNew.push({id: i+=1, value: parseInt(valAdd)});
			this.setState({counters: countersNew, valAdd: ""});
		}
	}
	addValueInput = (e) => {
		this.setState({valAdd: e.target.value})
	}
	render(){

		return (
			<div>
				<Navbar counterNum={this.state.counters.filter(c=>c.value>0).length}/>
				<main className='container'>
					<Counters 
						state={this.state}
						onBorrar={this.manejadorBorrar} 
						onIncrementar={this.manejarIncremento} 
						onReiniciar={this.manejadorReiniciar} 
						onAdd={this.manejadorAgregar} 
						addValueInput={this.addValueInput}
					/>
				</main>
			</div>	
		)
	}
}
export default App;
