import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

// Gets all the PCNs from the DB and sets the list to be rendered on the DOM.

function* fetchSaga () {
    try{
        const response = yield axios.get(`/api/pcn`);
        yield put({type: 'SET_LIST', payload: response.data})
    } catch (error) {
        console.log('error in Getting PCN documents', error)
    }
}

function* fetchPcnSaga(){ 
    yield takeEvery('FETCH_PCN_LIST', fetchSaga);
}

  
  export default fetchPcnSaga;