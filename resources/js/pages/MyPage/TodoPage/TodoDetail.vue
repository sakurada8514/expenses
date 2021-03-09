<template>
    <div v-if="todo">
        <p>{{todo.title}}</p>
        <p>{{todo.period}}</p>
        <p>{{todo.memo}}</p>
        <p>{{todo.user.name}}</p>
        <button @click="destroy">削除</button>
    </div>
</template>

<script>
import { OK } from "../../../util";
export default {
    data() {
        return {
            todo: ""
        };
    },
    computed:{
        todoId() {
            return this.$route.params['id']
        }
    },
    methods: {
        async read() {
            const id = this.$route.params["id"];
            const response = await axios
                .get(`/api/todo/${id}`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.todo = response.data;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        async destroy() {
            const id = this.$route.params["id"];
            const response = await axios
                .post(`/api/todo/delete/${id}`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                const roomName = this.$store.getters["auth/roomName"];
                this.$router.push({
                    name: "todoList",
                    params: { roomname: roomName }
                })
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        }
    },
    created() {
        this.read();
    }
};
</script>
