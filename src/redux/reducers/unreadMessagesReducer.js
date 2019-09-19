const unreadMessages = (state = [], action) => {
    switch (action.type) {
        case 'SET_UNREAD_MESSAGES':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default unreadMessages;