import {
  ADD_USER,
  ADD_USER_BEGIN,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  DELETE_USER_BY_ID,
  DELETE_USER_BY_ID_BEGIN,
  DELETE_USER_BY_ID_FAIL,
  DELETE_USER_BY_ID_SUCCESS,
  EDIT_USER_BY_ID,
  EDIT_USER_BY_ID_BEGIN,
  EDIT_USER_BY_ID_FAIL,
  EDIT_USER_BY_ID_SUCCESS,
  GET_USERS,
  GET_USERS_BEGIN,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USER_BY_ID,
  GET_USER_BY_ID_BEGIN,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_SUCCESS,
} from "./actionTypes";

export const getUsers = (request) => ({
  type: GET_USERS,
  request: request,
});

export const getUsersBegin = () => ({
  type: GET_USERS_BEGIN,
});

export const getUsersSuccess = (user) => ({
  type: GET_USERS_SUCCESS,
  payload: user,
});

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: error,
});

export const getUserByID = ({ id }) => ({
  type: GET_USER_BY_ID,
  id: id,
});

export const getUserByIDBegin = () => ({
  type: GET_USER_BY_ID_BEGIN,
});

export const getUserByIDSuccess = (user) => ({
  type: GET_USER_BY_ID_SUCCESS,
  payload: user,
});

export const getUserByIDFail = (error) => ({
  type: GET_USER_BY_ID_FAIL,
  payload: error,
});

export const addUser = ({ formData, callback }) => ({
  type: ADD_USER,
  formData: formData,
  callback: callback,
});

export const addUserBegin = () => ({
  type: ADD_USER_BEGIN,
});

export const addUserSuccess = () => ({
  type: ADD_USER_SUCCESS,
});

export const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: error,
});

export const editUserByID = ({ id, formData, callback }) => ({
  type: EDIT_USER_BY_ID,
  id: id,
  formData: formData,
  callback: callback,
});

export const editUserByIDBegin = () => ({
  type: EDIT_USER_BY_ID_BEGIN,
});

export const editUserByIDSuccess = (user) => ({
  type: EDIT_USER_BY_ID_SUCCESS,
  payload: user,
});

export const editUserByIDFail = (error) => ({
  type: EDIT_USER_BY_ID_FAIL,
  payload: error,
});

export const deleteUserByID = ({ id, callback }) => ({
  type: DELETE_USER_BY_ID,
  id: id,
  callback: callback,
});

export const deleteUserByIDBegin = () => ({
  type: DELETE_USER_BY_ID_BEGIN,
});

export const deleteUserByIDSuccess = (user) => ({
  type: DELETE_USER_BY_ID_SUCCESS,
  payload: user,
});

export const deleteUserByIDFail = (error) => ({
  type: DELETE_USER_BY_ID_FAIL,
  payload: error,
});
