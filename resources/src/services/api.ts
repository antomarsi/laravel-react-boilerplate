import axios from "axios";

import store from "../store";
import { AuthCreators } from "../store/ducks/auth/types";
import { NotificationCreators } from "../store/ducks/notification/types";
import { notificationError } from "../utils/handleMessages";
import { push } from "connected-react-router";

let token: HTMLMetaElement = document.head.querySelector(
    'meta[name="csrf-token"]'
);

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

if (token) {
    api.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    throw new Error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

api.defaults.headers.common["X-Requested-With"] = XMLHttpRequest;

api.interceptors.request.use(
    config => {
        const {
            auth: { token }
        } = store.store.getState();

        if (token) config.headers.authorization = `BEARER ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    response => {
        if (response.headers["x-auth-token"])
            store.store.dispatch(
                AuthCreators.authTokenUpdate(response.headers["x-auth-token"])
            );
        return response;
    },
    error => {
        if (error.response.status === 401) {
            store.store.dispatch(AuthCreators.authReset());
            store.store.dispatch(push("/login"));
        }
        const notification = notificationError(error);
        if (notification) {
            store.store.dispatch(
                NotificationCreators.addNotification(notification)
            );
        }
        return Promise.reject(error);
    }
);

export default api;
