import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//
function* fetchCurrentEol(action) {
    try {
        const response = yield axios.get(`/api/eol/current?id=${action.payload}`)
        yield put({ type: 'SET_CURRENT_EOL', payload: response.data })
    }
    catch (error) {
        console.log('error fetching current eol', error);
    }
}

function* fetchCurrentEolSaga() {
    yield takeEvery('FETCH_CURRENT_EOL', fetchCurrentEol);
}

export default fetchCurrentEolSaga;