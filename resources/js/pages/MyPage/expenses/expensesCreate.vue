<template>
    <div>
        <form @submit.prevent="create">
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
            <button type="submit">支出追加</button>
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
        async create() {
            const formData = this.formData;
            const response = await axios
                .post("/api/expense/create", formData)
                .catch(err => err.response || err);

            if (response.status === CREATED) {
                const roomName = this.$store.getters["auth/roomName"];
                this.$router.push({
                    name: "myPageTop",
                    params: { roomname: roomName }
                });
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        }
    },
    created() {
        this.readCategories();
    }
};
</script>
