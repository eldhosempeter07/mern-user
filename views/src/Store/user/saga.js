import { call, takeLatest, put } from "redux-saga/effects";
import { add, del, get, update } from "../../Helpers/api_helpers";
import {
  addUserBegin,
  addUserFail,
  addUserSuccess,
  deleteUserByIDBegin,
  deleteUserByIDFail,
  deleteUserByIDSuccess,
  editUserByIDBegin,
  editUserByIDFail,
  editUserByIDSuccess,
  getUserByIDBegin,
  getUserByIDFail,
  getUserByIDSuccess,
  getUsersBegin,
  getUsersFail,
  getUsersSuccess,
} from "./actions";
import {
  ADD_USER,
  DELETE_USER_BY_ID,
  EDIT_USER_BY_ID,
  GET_USERS,
  GET_USER_BY_ID,
} from "./actionTypes";

function* getUsers(res) {
  try {
    console.log(res);
    yield put(getUsersBegin());
    const response = yield call(get, "/user", res.request);
    console.log("response", response);
    if (response) {
      console.log(response);
      yield put(getUsersSuccess(response));
    }
  } catch (error) {
    yield put(getUsersFail(error));
  }
}

function* getUserByID({ id }) {
  try {
    yield put(getUserByIDBegin());
    const response = yield call(get, `/user/${id}`);
    if (response) {
      console.log(response);
      yield put(getUserByIDSuccess(response?.result));
    }
  } catch (error) {
    yield put(getUserByIDFail(error));
  }
}

function* addUser({ formData, callback }) {
  try {
    yield put(addUserBegin());
    const response = yield call(add, "/user", formData);
    console.log(response);
    if (response) {
      console.log(response);
      yield put(addUserSuccess(response?.result));
      callback && callback();
    }
  } catch (error) {
    yield put(addUserFail(error));
  }
}

function* editUserByID({ id, formData, callback }) {
  try {
    yield put(editUserByIDBegin());
    const response = yield call(update, `/user/${id}`, formData);
    if (response) {
      console.log(response);
      yield put(editUserByIDSuccess(response?.result));
      callback && callback();
    }
  } catch (error) {
    yield put(editUserByIDFail(error));
  }
}

function* deleteUserByID({ id, callback }) {
  try {
    yield put(deleteUserByIDBegin());
    const response = yield call(del, `/user/${id}`);
    if (response) {
      console.log(response);
      yield put(deleteUserByIDSuccess(response?.result));
      callback && callback();
    }
  } catch (error) {
    yield put(deleteUserByIDFail(error));
  }
}

function* userSaga() {
  yield takeLatest(GET_USERS, getUsers);
  yield takeLatest(GET_USER_BY_ID, getUserByID);
  yield takeLatest(ADD_USER, addUser);
  yield takeLatest(EDIT_USER_BY_ID, editUserByID);
  yield takeLatest(DELETE_USER_BY_ID, deleteUserByID);
}

export default userSaga;
