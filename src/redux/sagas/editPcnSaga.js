import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
// sends updated parts to the table to put the changes to the current column
function* editPcn(action){
    try{
        yield axios.put('/api/pcn/edit', action.payload.newPcn);
        yield put({ type: 'FETCH_DASHBOARD', payload: {userId: action.payload.userId, status: ''} })
    }
    catch(error){
        console.log('error editing pcn', error);
    }
}

function* savePcn(action){
    try{
        yield axios.put('/api/pcn/save', action.payload.newPcn);
        yield put({ type: 'FETCH_DASHBOARD', payload: {userId: action.payload.userId, status: ''} })
    }
    catch(error){
        console.log('error save pcn', error);
    }
}

function* editPcnSaga(){
    yield takeEvery('EDIT_PCN', editPcn);
    yield takeEvery('SAVE_PCN', savePcn);
}

export default editPcnSaga;