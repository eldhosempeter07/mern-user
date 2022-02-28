import { ADD_USER_BEGIN, ADD_USER_FAIL, ADD_USER_SUCCESS, DELETE_USER_BY_ID_BEGIN, DELETE_USER_BY_ID_FAIL, DELETE_USER_BY_ID_SUCCESS, EDIT_USER_BY_ID_BEGIN, EDIT_USER_BY_ID_FAIL, EDIT_USER_BY_ID_SUCCESS, GET_USERS_BEGIN, GET_USERS_FAIL, GET_USERS_SUCCESS, GET_USER_BY_ID_BEGIN, GET_USER_BY_ID_FAIL, GET_USER_BY_ID_SUCCESS } from "./actionTypes"

export const init_state = {
    userList:{},
    userDetails:{},
    loading:false,
    error:""
}

const Users = (state=init_state,action) => {
    switch(action.type){
        case GET_USERS_BEGIN:
            return {
                ...state,
                loading:true,
                userList:{}
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                userList:action.payload
            }

        case GET_USERS_FAIL:
            return {
                ...state,
                loading:false,
                userList:{},
                error:action.payload

            }

            case GET_USER_BY_ID_BEGIN:
    return {
        ...state,
        loading:true,
        userDetails:{}
    }

case GET_USER_BY_ID_SUCCESS:
    return {
        ...state,
        loading:false,
        userDetails:action.payload
    }

case GET_USER_BY_ID_FAIL:
    return {
        ...state,
        loading:false,
        userDetails:{},
        error:action.payload

    }


        case ADD_USER_BEGIN:
            return {
                ...state,
                loading:true,
            }
    
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading:false,
            }
    
        case ADD_USER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
    
            }



            case EDIT_USER_BY_ID_BEGIN:
    return {
        ...state,
        loading:true,
    }

case EDIT_USER_BY_ID_SUCCESS:
    return {
        ...state,
        loading:false,
    }

case EDIT_USER_BY_ID_FAIL:
    return {
        ...state,
        loading:false,
        error:action.payload

    }

    
    case DELETE_USER_BY_ID_BEGIN:
        return {
            ...state,
            loading:true,
        }
    
    case DELETE_USER_BY_ID_SUCCESS:
        return {
            ...state,
            loading:false,
        }
    
    case DELETE_USER_BY_ID_FAIL:
        return {
            ...state,
            loading:false,
            error:action.payload
    
        }
        default:return state


    }
}

export default Users