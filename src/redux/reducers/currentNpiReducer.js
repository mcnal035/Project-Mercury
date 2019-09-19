const currentNpiReducer = (state = {}, action) => {
    if (action.type === 'SET_CURRENT_NPI') {
        return action.payload;
    } else {
        return state;
    }
}

export default currentNpiReducer;