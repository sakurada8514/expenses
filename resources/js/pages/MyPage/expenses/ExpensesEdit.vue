<template>
    <div v-if="categories">
        <form @submit.prevent="update">
            <p>金額</p>
            <input type="number" name="money" v-model="formData.money" />
            <p>カテゴリ</p>
            <select
                name="expenses_category"
                v-model="formData.expenses_category"
            >
                <option value="">選択してください</option>
                <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    >{{ category.name }}</option
                >
            </select>
            <p>日付</p>
            <input type="date" name="date" v-model="formData.date" />
            <p>利用場所</p>
            <input type="text" name="place" v-model="formData.place" />
            <button type="submit">変更</button>
        </form>
        <button @click="back">キャンセル</button>
    </div>
</template>

<script>
import { OK, CREATED } from "../../../util";
export default {
    data() {
        return {
            formData: {
                money: "",
                expenses_category: "",
                date: "",
                place: ""
            },
            categories: []
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        async readCategories() {
            const response = await axios
                .get("/api/expense/categories")
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.categories = response.data;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        async readExpense() {
            const id = this.$route.params["id"];
            const response = await axios
                .get(`/api/expense/${id}`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.formData.money = response.data.money;
                this.formData.date = response.data.date;
                this.formData.place = response.data.place;

                let category = this.categories.filter(function(category) {
                    return category.name === response.data.category.name;
                });
                this.formData.expenses_category = category[0].id;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        async update() {
            const formData = this.formData;
            const id = this.$route.params["id"];
            const response = await axios
                .post(`/api/expense/update/${id}`, formData)
                .catch(err => err.response || err);

            if (response.status === OK) {
                const roomName = this.$store.getters["auth/roomName"];
                this.$router.push({
                    name: "expensesList"
                });
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        }
    },
    async created() {
        await this.readCategories();
        await this.readExpense();
    }
};
</script>
