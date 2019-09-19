const createNpiReducer = (state = {}, action) => {
    if (action.type === 'SET_CREATE_NPI') {
        return action.payload;
    } else {
        return state;
    }
}

export default createNpiReducer;