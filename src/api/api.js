import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://gorest.co.in/public-api/',
    headers: {
        "Authorization" : 'Bearer G9TFc_7WD-v3O7tmf_3kJWVMpaAmoz8wO7XN',
    }
});

export const usersAPI = {
    getUsers(currentPage) {
        return instance.get(`users?fields=id,first_name,last_name,phone,email,website,_links&page=${currentPage}`)
            .then(res => {
                return res.data;
            });
    },
    deleteUser(userId) {
        return instance.delete(`users/${userId}`);
    }
};