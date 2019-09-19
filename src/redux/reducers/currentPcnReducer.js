const currentPcnReducer = (state={}, action) => {
    if(action.type === 'SET_CURRENT_PCN'){
        return action.payload;
    } else{
        return state;
    }
}

export default currentPcnReducer;