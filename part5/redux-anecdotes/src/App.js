import React from 'react';
import NewAnecdote from './components/NewAnecdote';
import Anecdotes from './components/Anecdotes';
import Notification from './components/Notification'

const App = ({ store }) => {
	return (
		<div>
			<Notification store={store} />
			<Anecdotes store={store} />
			<NewAnecdote store={store} />
		</div>
	);
};

export default App;
