import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* reviewPcn(action) {
    const data = {
        userId: 1,
        status: ''
    }
    try {
        yield axios.put(`/api/pcn/reviewpcn/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_ADMIN_DASHBOARD', payload: data })
    } catch (error) {
        console.log('Error reviewing PCN:', error);
    }
}

function* reviewPcnSaga() {
    yield takeEvery('REVIEW_PCN', reviewPcn);
}

export default reviewPcnSaga;
