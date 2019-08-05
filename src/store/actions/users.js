import {GET_USERS} from "../types/users";
import {usersAPI} from "../../api/api";

const setUsers = (users) => ({type: GET_USERS, users });

export const getUsers = () => {
    return (dispatch) => {
        usersAPI.getUsers().then(users => {
            dispatch(setUsers(users));
        });
    }
};