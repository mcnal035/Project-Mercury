import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// delete PCNs from database
function* deletePcn(action) {
    try {
        yield axios.delete(`/api/pcn/deletepcn?id=${action.payload.id}&type=${action.payload.type}`);
        yield put({ type: 'FETCH_DASHBOARD', payload: {status: action.payload.status, userId: action.payload.userId} });
    } catch (error) {
        console.log('Error deleting PCN in saga:', error);
    }
}

function* deletePcnSaga() {
    yield takeEvery('DELETE_PCN', deletePcn);
}

export default deletePcnSaga;