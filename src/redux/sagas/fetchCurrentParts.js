import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// fetches current parts by ID and Type.
function* fetchCurrentParts(action){
    try{
        const response = yield axios.get(`/api/parts/current?id=${action.payload.id}&type=${action.payload.type}`);
        yield put({type: 'SET_CURRENT_PARTS', payload: response.data})
    }
    catch(error){
        console.log('error fetching current parts', error);
    }
}

function* fetchCurrentPartsSaga(){
    yield takeEvery('FETCH_CURRENT_PARTS', fetchCurrentParts);
}

export default fetchCurrentPartsSaga;