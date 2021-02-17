<template>
    <router-view></router-view>
</template>

<script>
import {INTERNAL_SERVER_ERROR} from "./util";
export default {
    computed: {
        codeStatus() {
            return this.$store.state.error.code;
        }
    },
    watch: {
        codeStatus: {
            handler(val) {
                if (val === INTERNAL_SERVER_ERROR) {
                    this.$router.push("/500");
                }
            },
            immediate: true,
            $route() {
                this.$store.commit("error/setCode", null);
            }
        }
    }
};
</script>
