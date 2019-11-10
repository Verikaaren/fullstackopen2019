/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer';
import { voteNotification } from '../reducers/notificationReducer'

const NewAnecdote = props => {
	// eslint-disable-next-line no-unused-vars
	const addAnecdote = async event => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		props.createAnecdote(content)
		
		
	};

	return (
		<form onSubmit={addAnecdote}>
			<input name="anecdote" />
			<button type="submit">add</button>
		</form>
	);
};

export default connect(
null,
{ createAnecdote, voteNotification }

) (NewAnecdote);
