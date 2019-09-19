import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// queries the DB for the parts.
function* searchParts(action){
    try{
        const response = yield axios.get(`/api/parts/search?search=${action.payload.query}`)
        yield put({type: 'SET_SEARCH_PART', payload: response.data})
    }
    catch(error){
        console.log('error searching parts', error);        
    }
}

function* searchPartsSaga(){
    yield takeEvery('SEARCH_PARTS', searchParts);
}

export default searchPartsSaga;