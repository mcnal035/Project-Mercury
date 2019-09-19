import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
// sends updated parts to the table to put the changes to the current column
function* editNpi(action){
    try{
        yield axios.put('/api/npi/edit', action.payload.newNpi);
        yield put({ type: 'FETCH_DASHBOARD', payload: { userId: action.payload.userId, status: '' } })
    }
    catch(error){
        console.log('error editing pcn', error);
    }
}

function* saveNpi(action) {
    try {
        yield axios.put('/api/npi/save', action.payload.newNpi);
        yield put({ type: 'FETCH_DASHBOARD', payload: { userId: action.payload.userId, status: '' } })
    }
    catch (error) {
        console.log('error saving pcn', error);
    }
}

function* editNpiSaga(){
    yield takeEvery('EDIT_NPI', editNpi);
    yield takeEvery('SAVE_NPI', saveNpi);
}

export default editNpiSaga;