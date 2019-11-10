import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

import NewAnecdote from './components/NewAnecdote';
import Anecdotes from './components/Anecdotes';
import Notification from './components/Notification';

const App = props => {
	useEffect(() => {
		props.initializeAnecdotes()
	},[]);
	return (
		<div>
			<Notification />
			<Anecdotes />
			<NewAnecdote />
		</div>
	);
};

export default connect(
	null,
	{ initializeAnecdotes }
)(App);
