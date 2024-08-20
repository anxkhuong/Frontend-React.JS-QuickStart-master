import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserSerivce,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService, getDoctorDetailsService,
    getAllSpecialty,getAllClinic
} from '../../services/userService';
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
       dispatch(fetchPositionSuccess(res.data))
    }else{
        dispatch(fetchPositionFailed());
    }
   } catch (e) {
   dispatch(fetchPositionFailed());
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
       dispatch(fetchRoleSuccess(res.data))
    }else{
        dispatch(fetchRoleFailed());
    }
   } catch (e) {
   dispatch(fetchRoleFailed());
   }
    }
 
}


export const createNewUser =  (data) =>{
    return async(dispatch,getState) => {
        try {
            let res = await createNewUserService(data) ;
            if(res && res.errCode === 0){
                toast.success("Create a New User Succed! ")
                dispatch(saveUserSuccess(res.data))
             dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error('Create user failed!')
            dispatch(saveUserFailed());
        }
    }
}

export const deleteAUser =  (userId) =>{
    return async(dispatch,getState) => {
        try {
            let res = await deleteUserSerivce(userId) ;
            if(res && res.errCode === 0){
                toast.success("Delete User success! ")
                dispatch(deleteUserSuccess(res.data))
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Delete User  failed!')
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('Delete User  failed!')
            dispatch(deleteUserFailed());
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
                toast.error('Fetch all User  failed!')
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            toast.error('fetch all user failed!')
            dispatch(fetchAllUserFailed());
        }
    }
        }


export const editAUser =  (data) =>{
    return async(dispatch,getState) => {
        try {
            let res = await editUserService(data) ;
            if(res && res.errCode === 0){
                toast.success("Edit User Succed! ",{ autoClose: 1650 })
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart());

            }else{
                toast.success("Edit User Success ! ",{ autoClose: 1650 })

                // toast.error('edit the user failed!')
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('edit the user failed!')
            dispatch(editUserFailed());
        }
    }
}

export const fetchTopDoctor = () =>{
    return async(dispatch,getState) => {
        try {
    let res = await getTopDoctorHomeService('');
    if(res && res.errCode === 0){
        dispatch({
            type:actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
            dataDoctor:res.data
        })
    }else {
        dispatch({
            type:actionTypes.FETCH_TOP_DOCTOR_FAILED,

        })
    }
        } catch (e) {
console.log('FETCH_TOP_DOCTOR_FAILED: ',e)
            dispatch({
            type:actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}
export const fetchAllDoctors = () =>{
    return async(dispatch,getState) => {
        try {
            let res = await getAllDoctors('');
            if(res && res.errCode === 0){
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr:res.data
                })
            }else {
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTOR_FAILED,

                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_FAILED: ',e)
            dispatch({
                type:actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}
export  const editUserSuccess = (data) =>({
    type: actionTypes.EDIT_USER_SUCCESS
});

export  const editUserFailed = (data) =>({
    type: actionTypes.EDIT_USER_FAILED
});

export const deleteUserSuccess = () =>({
    type: actionTypes.DELETE_USER_SUCCESS
});
export const deleteUserFailed = () =>({
    type: actionTypes.DELETE_USER_FAILED
})

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users: data
});

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const saveDetailDoctor = (data) =>{
    return async(dispatch,getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if(res && res.errCode === 0){
                toast.success("Details saved successfully!");
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }else {
                toast.error("Details saved failed!");
                console.log("err res ", res)
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error("Details saved failed!");
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ',e)
            dispatch({
                type:actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = (type) =>{
    return async(dispatch,getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else {

                console.log("err res ", res)
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {

            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ',e)
            dispatch({
                type:actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const fetchDoctorDetails = (doctorId) => {
    return async (dispatch) => {
        try {
            let res = await getDoctorDetailsService(doctorId); // Gọi API để lấy chi tiết bác sĩ
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_DETAILS_SUCCESS,
                    data: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_DETAILS_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_DETAILS_FAILED,
            });
            console.log('FETCH_DOCTOR_DETAILS_FAILED: ', e);
        }
    };
};



export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
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

export const getRequiredDoctorInfor = () => {
    return async(dispatch,getState) =>{
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await  getAllCodeService("PRICE");
            let resPayment = await  getAllCodeService("PAYMENT");
            let resProvince = await  getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if(resPrice && resPrice.errCode === 0
            && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
            && resSpecialty && resSpecialty.errCode === 0
            && resClinic && resClinic.errCode === 0

            ){
let data = {
    resPrice : resPrice.data,
    resPayment: resPayment.data,
    resProvince:resProvince.data,
    resSpecialty:resSpecialty.data,
    resClinic:resPrice.data
}
                dispatch(fetchRequiredDoctorInfoSuccess(data))
            }else{
                dispatch(fetchRequiredDoctorInfoFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInfoFailed());
            console.log('fetchRequiredDoctorInfo: ',e)
        }
    }

}

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,

})