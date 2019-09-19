const pcnImage = (state = [], action) => {
    switch (action.type) {
        case 'SET_PCN_IMAGES':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default pcnImage;