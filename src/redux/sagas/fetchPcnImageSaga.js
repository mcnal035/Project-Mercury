import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchPcnImage(action) {
    try {
        const id = action.payload.id;
        const response = yield axios.get(`/api/aws/retrieve?id=${id}`);
        yield put({type: 'SET_PCN_IMAGES', payload: response.data});
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* fetchPcnImageSaga() {
    yield takeEvery('FETCH_PCN_IMAGES', fetchPcnImage);
}

export default fetchPcnImageSaga;
