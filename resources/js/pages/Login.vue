<template>
    <div>
        <h1>会員登録</h1>
        <div>
            <form @submit.prevent="login">
                <p>メールアドレス</p>
                <input
                    type="email"
                    name="email"
                    id=""
                    v-model="loginFormData.email"
                />
                <p>パスワード</p>
                <input
                    type="password"
                    name="password"
                    id=""
                    v-model="loginFormData.password"
                />
                <button type="submit">登録</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginFormData: {
                email: "",
                password: "",
                remember: "on"
            }
        };
    },
    computed: {
        apiStatus() {
            return this.$store.state.auth.apiStatus;
        },
        loginErrorMessage() {
            return this.$store.state.auth.loginErrorMessage;
        }
    },
    methods: {
        async login() {
            await this.$store.dispatch("auth/login", this.loginFormData);
            if (this.apiStatus) {
                this.$router.push("/room.create");
            }
        },
        errorCrear() {
            this.$store.commit("auth/setLoginErrorMessage",null);
        }
    },
    created() {
        this.errorCrear();
    }
};
</script>