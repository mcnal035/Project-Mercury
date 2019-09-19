import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// updates the part row and adds the replacement part in the database then returns to the form.
function* addReplacement(action){
    try{
        yield axios.put('/api/parts/replacement', action.payload);
        yield put({type: 'FETCH_CURRENT_PARTS', payload: {id: action.payload.id, type: action.payload.type}})
    }
    catch(error){
        console.log('error adding replacement number', error)
    }
}

function* addReplacementSaga(){
    yield takeEvery('ADD_REPLACEMENT', addReplacement);
}

export default addReplacementSaga;