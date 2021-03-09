<template>
    <div>
        <form @submit.prevent="create">
            <p>ToDo名</p>
            <input v-model="formData.title" type="text" />
            <p>期限</p>
            <input v-model="formData.period" type="date" name="" id="" />
            <p>メモ</p>
            <textarea v-model="formData.memo"></textarea>
            <button type="submit">追加</button>
        </form>
    </div>
</template>

<script>
import { CREATED } from "../../../util";
export default {
    data() {
        return {
            formData: {
                title: "",
                period: "",
                memo: ""
            }
        };
    },
    methods: {
        async create() {
            const formData = this.formData;
            const response = await axios
                .post("/api/todo/create", formData)
                .catch(err => err.response || err);

            if (response.status === CREATED) {
                const roomName = this.$store.getters["auth/roomName"];
                this.$router.push({
                    name: "todoList"
                });
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        }
    }
};
</script>
