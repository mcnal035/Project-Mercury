const searchPcn = (state=[], action) => {
    switch (action.type) {
       case 'SEARCH_REDUCER':
            return action.payload;
        default:
            return state;
    }
}

export default searchPcn;