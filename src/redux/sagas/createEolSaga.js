import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// Posts an EOL form to the EOL table in the DB.
function* createEol(action) {
    try {
        const response = yield axios.post(`/api/eol/create`, action.payload);
        yield put({ type: 'SET_CREATE_EOL', payload: response.data })
    }
    catch (error) {
        console.log('error creating new pcn', error);
    }
}

function* createEolSaga() {
    yield takeEvery('CREATE_EOL', createEol)
}

export default createEolSaga;