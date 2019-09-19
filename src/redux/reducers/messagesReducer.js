const messages = (state = [], action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default messages;