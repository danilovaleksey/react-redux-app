import {
    GET_USERS,
    DELETE_USER,
} from "../types/users";
import {usersAPI} from "../../api/api";
import history from "../../history";

// ACTIONS
const setUsers = (users, currentPage, totalCount, perPage) => ({
    type: GET_USERS,
    users,
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
            history.push(`/page/${currentPage}`);
            dispatch(setUsers(data.result, currentPage, totalCount, perPage));
        });
    }
};
const deleteUserThunk = (userId) => {
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
    deleteUserThunk,
};