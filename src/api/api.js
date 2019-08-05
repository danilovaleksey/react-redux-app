import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://gorest.co.in/public-api/',
    headers: {
        "Authorization" : 'Bearer G9TFc_7WD-v3O7tmf_3kJWVMpaAmoz8wO7XN',
    }
});

export const usersAPI = {
    getUsers() {
        return instance.get('users')
            .then(res => {
                return res.data.result;
            });
    }
};