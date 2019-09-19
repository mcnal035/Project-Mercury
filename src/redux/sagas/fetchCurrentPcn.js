import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//gets the current pcn from the when its click on the DOM.
function* fetchCurrentPcn(action){
    try{
        const response = yield axios.get(`/api/pcn/current?id=${action.payload}`)
        yield put({type: 'SET_CURRENT_PCN', payload: response.data})
    }
    catch(error){
        console.log('error fetching current pcn', error);
    }
}

function* fetchCurrentPcnSaga(){
    yield takeEvery('FETCH_CURRENT_PCN', fetchCurrentPcn);
}

export default fetchCurrentPcnSaga;