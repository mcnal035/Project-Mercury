import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// Deletes the pcn part by id number and type removing it from the table
function* deletePcnPart(action){
    try{
        yield axios.delete(`/api/parts/pcn_part?id=${action.payload.id}&type=${action.payload.type}`);
        yield put({type: 'FETCH_CURRENT_PARTS', payload: {id: action.payload.pcnId, type: action.payload.type }})
    }
    catch(error){
        console.log('error deleting pcnPart', error);
    }
}

function* deletePcnPartSaga(){
    yield takeEvery('DELETE_PCN_PART', deletePcnPart);
}

export default deletePcnPartSaga;