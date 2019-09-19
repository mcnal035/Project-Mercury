const pcnInfo = (state = [], action) => {
    switch (action.type) {
        case 'SET_PCN_INFO':
            return action.payload[0];
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default pcnInfo;