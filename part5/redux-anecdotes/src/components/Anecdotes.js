import React from 'react';
import Anecdote from './Anecdote';
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { voteNotification } from '../reducers/notificationReducer'


const Anecdotes = props => {

    let  vote =  (anecdote) => {
        props.voteAnecdote(anecdote)
        props.voteNotification(`you vote ${anecdote.content}`)
        setTimeout(() => props.voteNotification(null), 5000)
    }

	return (
		<div>
			{props.anecdotes.map(dote => (
				<Anecdote
					anecdote={dote}
					handleClick={() => vote(dote)}
				/>
			))}
		</div>
	);
};

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    voteNotification
}
const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps

    )(Anecdotes)
export default ConnectedAnecdotes;
