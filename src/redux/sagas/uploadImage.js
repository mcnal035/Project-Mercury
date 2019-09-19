import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* uploadImage(action){
    try{
        yield axios.get(`/api/aws/upload?name=${action.payload.image.name}`)
            .then(response => {
                axios.put(response.data, action.payload.image)
            })
        yield axios.post(`/api/aws/upload`, {image: action.payload.image.name, id: action.payload.id})
        yield put({ type: 'FETCH_PCN_IMAGES', payload: { id: action.payload.id } })
    }
    catch(error){
        console.log('error uploading image', error);
    }
}

function* uploadImageSaga(){
    yield takeEvery('UPLOAD_IMAGE', uploadImage);
}

export default uploadImageSaga;