// Main reducer for holding the PCN forms and holds them as an array.
const getPcn = (state=[], action) => {
    switch (action.type) {
       case 'SET_LIST':
            return action.payload;
        default:
            return state;
    }

}



export default getPcn;