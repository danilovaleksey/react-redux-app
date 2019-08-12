import {
    GET_USERS,
    SET_PAGINATION,
    DELETE_USER,
} from '../types/users';

let initialState = {
    users: [],
    currentPage: 1,
    totalCount: 100,
    perPage: 20,
};

export function UsersList (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_PAGINATION:
            return {
                ...state,
                currentPage: action.currentPage,
                totalCount: action.totalCount,
                perPage: action.perPage
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(item => !(item.id === action.userID)),
            };
        default:
            return state;
    }
}