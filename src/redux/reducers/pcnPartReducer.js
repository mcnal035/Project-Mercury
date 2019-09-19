const pcnPart = (state = [], action) => {
    switch (action.type) {
        case 'SET_PCN_PARTS':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default pcnPart;