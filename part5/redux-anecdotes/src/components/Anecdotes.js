import React from 'react';
import Anecdote from './Anecdote';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { voteNotification } from '../reducers/notificationReducer'


const Anecdotes = ({ store }) => {

    let  vote =  (id, anecdote) => {
        store.dispatch(voteAnecdote(id))
        store.dispatch(voteNotification(`you vote ${anecdote}`))
        setTimeout(() => store.dispatch(voteNotification(null)), 5000)
    }

	return (
		<div>
			{store.getState().anecdotes.map(dote => (
				<Anecdote
					anecdote={dote}
					handleClick={() => vote(dote.id, dote.content)}
				/>
			))}
		</div>
	);
};

export default Anecdotes;
