const searchPartReducer = (state = [], action) => {
    if(action.type === 'SET_SEARCH_PART'){
        return action.payload;
    } else{
        return state;
    }
}

export default searchPartReducer;