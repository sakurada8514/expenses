import axios from "axios";
import { OK, UNPROCESSABLE_ENTITY, CREATED } from "../util";
const state = {
    user: null,
    roomName: null,
    apiStatus: null,
    registerErrorMessage: null,
    loginErrorMessage: null
};

const getters = {
    check: state => !!state.user,
    roomName: state => (state.roomName ? state.roomName : "")
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setApiStatus(state, status) {
        state.apiStatus = status;
    },
    setRgisterErrorMessage(state, message) {
        state.registerErrorMessage = message;
    },
    setLoginErrorMessage(state, message) {
        state.loginErrorMessage = message;
    },
    setRoomName(state, name) {
        state.roomName = name;
    }
};

const actions = {
    async register(context, data) {
        context.commit("setApiStatus", null);
        const response = await axios
            .post("api/register", data)
            .catch(err => err.response || err);

        if (response.status === OK) {
            context.commit("setApiStatus", true);
            context.commit("setUser", response.data.user);
            return;
        }

        context.commit("setApiStatus", false);
        //バリデーションエラー
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setRegisterErrorMessages", response.data.errors);
        } else {
            //システムエラー
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    async login(context, data) {
        context.commit("setApiStatus", null);
        const response = await axios
            .post("api/login", data)
            .catch(err => err.response || err);

        if (response.status === OK) {
            const roomName = response.data.roomName || null;
            context.commit("setApiStatus", true);
            context.commit("setUser", response.data.user);
            context.commit("setRoomName", roomName);
            return;
        }

        context.commit("setApiStatus", false);
        //バリデーションエラー
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setLoginErrorMessages", response.data.errors);
        } else {
            //システムエラー
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    async userCheck(context) {
        const response = await axios
            .get("/api/user")
            .catch(err => err.response || err);

        //通信成功したらユーザー情報と日記情報をセット
        if (response.status === OK) {
            const user = response.data.user || null;
            const roomName = response.data.roomName;
            context.commit("setUser", user);
            context.commit("setRoomName", roomName);
            return;
        }

        //システムエラー
        context.commit("error/setCode", response.status, { root: true });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
