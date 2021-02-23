<template>
    <div>
        <p>ルーム作成</p>
        <form @submit.prevent="roomCreate">
            <p>ルーム名</p>
            <input type="text" v-model="roomFormData.name" />
            <button type="submit">作成</button>
        </form>
    </div>
</template>

<script>
import { OK, UNPROCESSABLE_ENTITY, CREATED } from "../util";
export default {
    data() {
        return {
            roomFormData: {
                name: ""
            }
        };
    },
    methods: {
        async roomCreate() {
            const data = this.roomFormData;
            const response = await axios
                .post("api/room.create", data)
                .catch(err => err.response || err);

            if (response.status === CREATED) {
                const name = this.roomFormData.name;
                this.$store.commit("auth/setRoomName", name);
                this.$router.push(`/${name}`);
            }
        }
    }
};
</script>
