import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// grabs the dashboard for the specfic user and it checks the userID and pulls that users dashboard. 
//Admin or Product Manager will get their dashboard views based off their User id.
function* fetchDashboard(action) {
    try {
        const response = yield axios.get(`/api/pcn/getdashboard?id=${action.payload.userId}&status=${action.payload.status}`);
        yield put({ type: 'SET_DASHBOARD', payload: response.data })
    } catch (error) {
        console.log('Error retrieving forms:', error);
    }
}

function* fetchDashboardSaga() {
    yield takeEvery('FETCH_DASHBOARD', fetchDashboard);
}

export default fetchDashboardSaga;