/* eslint-disable no-undef */
/* eslint-disable default-case */

import anecdotesService from '../services/anecdotes';

export const voteAnecdote = anecdote => {
	//console.log(anecdote);
	return async dispatch => {
		const newAnecdote = await anecdotesService.addVote(anecdote);
		dispatch({
			type: 'VOTE_ANECDOTE',
			data:  newAnecdote 
		});
	};
};

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdotesService.createNew(content);
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote
		});
	};
};

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdotesService.getAll();
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		});
	};
};

/* const asObject = anecdote => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	};
}; */

//const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
	/* console.log('state now: ', state);
	console.log('action', action); */
	switch (action.type) {
		case 'VOTE_ANECDOTE':
			const id = action.data.id;
		//	console.log(action.data)

			return state.map(anecdote =>
				anecdote.id !== id ? anecdote : action.data
			);
		case 'NEW_ANECDOTE':
			return [...state, action.data];
		case 'INIT_ANECDOTES':
			return action.data;
	}

	return state;
};

export default reducer;
