<template>
    <div>
        <h1>会員登録</h1>
        <div>
            <form @submit.prevent="register">
                <p>名前</p>
                <input
                    type="text"
                    name="name"
                    v-model="registerFormData.name"
                />
                <p>メールアドレス</p>
                <input
                    type="email"
                    name="email"
                    id=""
                    v-model="registerFormData.email"
                />
                <p>パスワード</p>
                <input
                    type="password"
                    name="password"
                    id=""
                    v-model="registerFormData.password"
                />
                <p>パスワード確認</p>
                <input
                    type="password"
                    name="password_confirmation"
                    id=""
                    v-model="registerFormData.password_confirmation"
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
            registerFormData: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
        };
    },
    computed: {
        apiStatus() {
            return this.$store.state.auth.apiStatus;
        },
        registerErrorMessage() {
            return this.$store.state.auth.registerErrorMessage;
        }
    },
    methods: {
        async register() {
            await this.$store.dispatch("auth/register", this.registerFormData);
            if (this.apiStatus) {
                this.$router.push("/room.create");
            }
        },
        errorCrear() {
            this.$store.commit("auth/setRgisterErrorMessage",null);
        }
    },
    created() {
        this.errorCrear();
    }
};
</script>
