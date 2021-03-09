<template>
    <div>
        <ul>
            <li v-for="expense in expenses" :key="expense.id">
                <router-link :to="{name:'expenseDetail', params:{id: expense.id}}">
                    <span>{{ expense.category.name }}</span>
                    <span>{{ expense.money }}</span>
                    <span>{{ expense.date }}</span>
                    <span>{{ expense.place }}</span>
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
            expenses: null
        };
    },
    methods: {
        async readExpenses() {
            const roomId = this.$store.state.auth.user.room_id;
            const response = await axios
                .get(`/api/expense/list/${roomId}`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.expenses = response.data;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        }
    },
    created() {
        this.readExpenses();
    }
};
</script>
