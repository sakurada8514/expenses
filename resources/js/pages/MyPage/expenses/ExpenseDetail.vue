<template>
    <div v-if="expense">
        <p>{{expense.category.name}}</p>
        <p>{{expense.money}}</p>
        <p>{{expense.date}}</p>
        <p>{{expense.place}}</p>
        <button @click="destroy">削除</button>
        <router-link :to="{name:'expensesEdit',params:{id:expenseId}}">編集</router-link>
    </div>
</template>

<script>
import { OK } from "../../../util";
export default {
    data() {
        return {
            expense: ""
        };
    },
    computed:{
        expenseId() {
            return this.$route.params['id']
        }
    },
    methods: {
        async read() {
            const id = this.$route.params["id"];
            const response = await axios
                .get(`/api/expense/${id}`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.expense = response.data;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        async destroy() {
            const id = this.$route.params["id"];
            const response = await axios
                .post(`/api/expense/delete/${id}`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                const roomName = this.$store.getters["auth/roomName"];
                this.$router.push({
                    name: "expensesList",
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
