const createEolReducer = (state = {}, action) => {
    if (action.type === 'SET_CREATE_EOL') {
        return action.payload;
    } else {
        return state;
    }
}

export default createEolReducer;