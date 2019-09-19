import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// fetchs current npi by ID.
function* fetchCurrentNpi(action){
    try{
        const response = yield axios.get(`/api/npi/current?id=${action.payload}`)
        yield put({type: 'SET_CURRENT_NPI', payload: response.data})
    }
    catch(error){
        console.log('error fetching current npi', error);
    }
}

function* fetchCurrentNpiSaga(){
    yield takeEvery('FETCH_CURRENT_NPI', fetchCurrentNpi);
}

export default fetchCurrentNpiSaga;