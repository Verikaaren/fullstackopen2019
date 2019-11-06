const notificationReducer = (state =null, action) => {
    switch (action.type) {
        case 'VOTE_NOTIFICATION':            
            return action.message
        default: 
            return state
    }
}

export const voteNotification= message => {
    return {
        type: 'VOTE_NOTIFICATION',
        message

    }
}

export default notificationReducer