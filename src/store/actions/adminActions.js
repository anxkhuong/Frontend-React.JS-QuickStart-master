import actionTypes from './actionTypes';
import {getAllCodeService, createNewUserService, getAllUsers, deleteUserSerivce} from '../../services/userService';
import {toast} from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async(dispatch,getState) =>{
        try {
            dispatch({
               type: actionTypes.FETCH_GENDER_START
            })
    let res = await getAllCodeService("GENDER");
    if(res && res.errCode === 0){
        console.log('an nhien check getstate: ',getState)
       dispatch(fetchGenderSuccess(res.data))
    }else{
        dispatch(fetchGenderFailed());
    }
   } catch (e) {
   dispatch(fetchGenderFailed());
    console.log('fetchGenderStart: ',e)
   }  
    }
 
}

export const fetchPositionStart = () => {
    return async(dispatch,getState) =>{
        try {
         
    let res = await getAllCodeService("POSITION");
    if(res && res.errCode === 0){
        console.log('an nhien check getstate: ',getState)
       dispatch(fetchPositionSuccess(res.data))
    }else{
        dispatch(fetchPositionFailed());
    }
   } catch (e) {
   dispatch(fetchPositionFailed());
    console.log('fetchGenderStart: ',e)
   }  
    }
 
}

export const fetchRoleStart = () => {
    return async(dispatch,getState) =>{
        try {
            dispatch({
               type: actionTypes.FETCH_GENDER_START
            })
    let res = await getAllCodeService("ROLE");
    if(res && res.errCode === 0){
        console.log('an nhien check getstate: ',getState)
       dispatch(fetchRoleSuccess(res.data))
    }else{
        dispatch(fetchRoleFailed());
    }
   } catch (e) {
   dispatch(fetchRoleFailed());
    console.log('fetchGenderStart: ',e)
   }  
    }
 
}


export const createNewUser =  (data) =>{
    return async(dispatch,getState) => {
        try {
            let res = await createNewUserService(data) ;
            console.log('admin check create user redux', res)
            if(res && res.errCode === 0){
                toast.success("Create a New User Succed! ")
                console.log('an nhien check getstate: ',getState)
                dispatch(saveUserSuccess(res.data))
             dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error('Create user failed!')
            dispatch(saveUserFailed());
            console.log('saveUserFailed error: ',e)
        }
    }
}

export const fetchAllUsersStart = () => {
    return async(dispatch,getState) =>{
        try {
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0){

                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }else{
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            toast.error('fetch all user failed!')
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUsersStart: ',e)
        }
    }
        }

export const deleteAUser =  (userId) =>{
    return async(dispatch,getState) => {
        try {
            let res = await deleteUserSerivce(userId) ;
            console.log('admin check create user redux', res)
            if(res && res.errCode === 0){
                toast.success("Delete User Succed! ",{ autoClose: 1650 })
                console.log('an nhien check getstate: ',getState)
                dispatch(saveUserSuccess(res.data))
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('delete the user failed!')
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error('delete the user failed!')
            dispatch(saveUserFailed());
            console.log('saveUserFailed error: ',e)
        }
    }
}

export const deleteUserSuccess = () =>({
    type: actionTypes.DELETE_USER_SUCCESS
});
export const deleteUserFailed = () =>({
    type: actionTypes.DELETE_USER_FAILED
})

export const fetchAllUserSuccess = (data) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
        users: data
});

export const fetchAllUserFailed = () => ({
    type: 'FETCH_ALL_USERS_FAILED',
});

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
});

export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED'
});

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
   
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
   
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
   
})