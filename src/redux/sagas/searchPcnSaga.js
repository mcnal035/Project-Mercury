import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// queries sent to the DB for the PCN and gets the response back.
function* searchSaga (action) {
    try{
        const response = yield axios.get(`/api/pcn/search?search=${action.payload}`);      
        yield put({type: 'SET_LIST', payload: response.data})
    } catch (error) {
        console.log('error in Getting PCN documents', error)
    }
}

function* searchPcnSaga(){ 
    yield takeEvery('GET_SEARCH', searchSaga);
}

  
  export default searchPcnSaga;