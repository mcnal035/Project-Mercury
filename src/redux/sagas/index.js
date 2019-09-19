import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import fetchPcnInfoSaga from './fetchPcnInfoSaga';
import fetchPcnPartSaga from './fetchPcnPartSaga';
import fetchPcnSaga from './fetchPcnSaga';
import fetchDashboardSaga from './fetchDashboardSaga';
import createPcnSaga from './createPcnSaga';
import editPcnSaga from './editPcnSaga';
import searchPcnSaga from './searchPcnSaga'
import fetchAdminDashboardSaga from './fetchAdminDashboardSaga';
import createPartsSaga from './createPartsSaga';
import fetchCurrentPartsSaga from './fetchCurrentParts';
import searchPartsSaga from './searchPartsSaga';
import addPartSaga from './addPartSaga';
import fetchCurrentPcnSaga from './fetchCurrentPcn';
import reviewPcnSaga from './reviewPcnSaga';
import createEolSaga from './createEolSaga';
import fetchCurrentEolSaga from './fetchCurrentEol';
import editEolSaga from './editEolSaga';
import deletePcnSaga from './deletePcnSaga';
import fetchPcnImageSaga from './fetchPcnImageSaga';
import deletePcnPartSaga from './deletePcnPartSaga';
import fetchCurrentNpiSaga from './fetchCurrentNpi';
import createNpiSaga from './createNpiSaga';
import editNpiSaga from './editNpiSaga';
import addReplacementSaga from './addReplacement';
import fetchMessagesSaga from './fetchMessagesSaga';
import uploadImageSaga from './uploadImage';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    fetchPcnInfoSaga(),
    fetchPcnPartSaga(),
    fetchPcnSaga(),
    fetchDashboardSaga(),
    createPcnSaga(),
    editPcnSaga(),
    searchPcnSaga(),
    fetchAdminDashboardSaga(),
    createPartsSaga(),
    fetchCurrentPartsSaga(),
    searchPartsSaga(),
    addPartSaga(),
    fetchCurrentPartsSaga(),
    fetchCurrentPcnSaga(),
    reviewPcnSaga(),
    createEolSaga(),
    fetchCurrentEolSaga(),
    editEolSaga(),
    deletePcnSaga(),
    fetchPcnImageSaga(),
    deletePcnPartSaga(),
    fetchCurrentNpiSaga(),
    createNpiSaga(),
    editNpiSaga(),
    addReplacementSaga(),
    fetchMessagesSaga(),
    uploadImageSaga()

  ]);
}
