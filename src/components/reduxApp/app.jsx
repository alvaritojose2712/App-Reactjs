import React, {Component} from 'react';
import {createStore} from 'redux'

const reducer = (state, action) => {
	if (action.type === "changeState") {
		return action.payload.newState
	}

	return "State"
}
const store = createStore(reducer)


const action = {
	type: 'changeState',
	payload: {
		newState: "New state"
	}
}

store.dispatch(action)

export default class App extends Component{
	render(){
		return(
			<h1>Estoy en redux</h1>
		)
	}
}