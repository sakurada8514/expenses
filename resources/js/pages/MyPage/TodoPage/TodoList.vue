<template>
    <div>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <router-link :to="{name:'todoDetail', params:{id: todo.id}}">
                    <span>{{ todo.title }}</span>
                    <span>{{ todo.period }}</span>
                    <span>{{ todo.memo }}</span>
                    <!-- <span>{{ todo.place }}</span> -->
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { OK } from "../../../util";
export default {
    data() {
        return {
            todos: null
        };
    },
    methods: {
        async readTodos() {
            const roomId = this.$store.state.auth.user.room_id;
            const response = await axios
                .get(`/api/todo/list/${roomId}`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.todos = response.data;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        }
    },
    created() {
        this.readTodos();
    }
};
</script>
