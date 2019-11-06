/* eslint-disable no-undef */
import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { voteNotification } from '../reducers/notificationReducer'

const NewAnecdote = props => {
	// eslint-disable-next-line no-unused-vars
	const addAnecdote = event => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		props.store.dispatch(createAnecdote(content));
		props.store.dispatch(voteNotification(`you added this - ${content}`))
		event.target.anecdote.value = '';
	};

	return (
		<form onSubmit={addAnecdote}>
			<input name="anecdote" />
			<button type="submit">add</button>
		</form>
	);
};

export default NewAnecdote;
