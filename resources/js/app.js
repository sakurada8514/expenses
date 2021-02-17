require("./bootstrap");

import Vue from "vue";
import router from "./router";
import store from "./store/index";
import App from "./App.vue";

const createApp = async () => {
    await store.dispatch('auth/userCheck');

    new Vue({
        el: "#app",
        router,
        store,
        components: {
            App
        },
        template: "<App></App>"
    });
}

createApp();
