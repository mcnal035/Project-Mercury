import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// Posts an PCN form to the PCN table in the DB.
function* createPcn(action){
    try{
        const response = yield axios.post(`/api/pcn/create`, action.payload);
        yield put({type: 'SET_CREATE_PCN', payload: response.data})
    } 
    catch(error) {
        console.log('error creating new pcn', error);
    }
}

function* createPcnSaga(){
    yield takeEvery('CREATE_PCN', createPcn)
}

export default createPcnSaga;