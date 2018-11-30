import React, {Component} from 'react';
import Counter from './counter';

const Counters = ({onReiniciar,state,onBorrar,onIncrementar,onAdd,addValueInput}) => {
	return (
		<div>
			<div className="row">
				<div className='col'>
					<button 
						className='btn btn-secundary btm-sm m-2' 
						onClick={onReiniciar}>Reiniciar
					</button>
				</div>
				<div className='col-3'>
					<div className='input-group'>
					  	<input 
					  		onChange={addValueInput} 
					  		value={state.valAdd} 
					  		type="number" 
					  		className="form-control" 
					  		placeholder='Valor Inicial' />
						<div className="input-group-prepend">
					    	<button 
					    		onClick={onAdd}
					    		className="btn btn-outline-secondary" 
					    		type="button">Agregar</button>
					 	</div>
					</div>
				</div>
			</div>
			{state.counters.map((counter,i) => 
				<Counter 
					key={counter.id} 
					onBorrar={onBorrar} 
					onIncrementar={onIncrementar} 
					counter={counter} />
			)}

		</div>
	)
}
export default Counters;
