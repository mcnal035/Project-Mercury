const currentEolReducer = (state = {}, action) => {
    if (action.type === 'SET_CURRENT_EOL') {
        return action.payload;
    } else {
        return state;
    }
}

export default currentEolReducer;