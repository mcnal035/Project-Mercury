const createPcnReducer = (state = {}, action) => {
    if(action.type === 'SET_CREATE_PCN'){
        return action.payload;
    } else {
        return state;
    }
}

export default createPcnReducer;