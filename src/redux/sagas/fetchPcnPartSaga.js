import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchPcnPart(action) {
    try {
        const response = yield axios.get(`/api/pcn/pcnparts?id=${action.payload.id}&type=${action.payload.type}`);
        yield put({ type: 'SET_PCN_PARTS', payload: response.data })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* fetchPcnPartSaga() {
    yield takeEvery('FETCH_PCN_PARTS', fetchPcnPart);
}

export default fetchPcnPartSaga;
