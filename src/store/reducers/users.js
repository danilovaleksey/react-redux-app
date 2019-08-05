import {
    GET_USERS,
} from '../types/users';

let initialState = {
    users: [],
};

export function UsersList (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return { ...state, users: action.users };
        default:
            return state;
    }
}