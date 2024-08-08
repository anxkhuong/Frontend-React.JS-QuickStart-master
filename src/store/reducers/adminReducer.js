import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    isLoadingGender: false,
    users: [],
    topDoctors:[],
    allDoctors:[]
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                isLoadingGender: false,
                genders: [],
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
                positions: [],
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
                roles: [],
            };
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            return {
                ...state,
                users: [],
            };
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctor;
            return {
                ...state
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return {
                ...state
            };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state
            };
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return {
                ...state
            };

        default:
            return state;
    }
}


export default adminReducer;