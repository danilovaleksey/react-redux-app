import {
    GET_USERS,
    SET_PAGINATION,
    DELETE_USER,
} from "../types/users";
import {usersAPI} from "../../api/api";
import history from "../../history";

// ACTIONS
const setUsers = (users) => ({
    type: GET_USERS,
    users
});
const setPagination = (currentPage, totalCount, perPage) => ({
    type: SET_PAGINATION,
    currentPage,
    totalCount,
    perPage
});
const deleteUserAction = (userID) => ({type: DELETE_USER, userID});

// THUNK FUNCTIONS
const getUsers = (currentPage) => {
    return (dispatch) => {
        usersAPI.getUsers(currentPage).then(data => {
            const {totalCount, perPage} = data._meta;
            dispatch(setPagination(currentPage, totalCount, perPage));
            dispatch(setUsers(data.result));
        });
    }
};
const changeUrl = (currentPage) => {
    return (dispatch) => {
        if (currentPage === 1) {
            history.push('/');
        } else {
            history.push(`/page/${currentPage}`);
        }
    }
};
const deleteUser = (userId) => {
    return (dispatch) => {
        usersAPI.deleteUser(userId).then(res => {
            if(res.status === 200) {
                dispatch(deleteUserAction(userId));
            }
        });
    };
};

export {
    getUsers,
    deleteUser,
    changeUrl,
};