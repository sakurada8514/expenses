import VueRouter from "vue-router";
import Vue from "vue";
import store from "./store";

import Top from "./pages/Top.vue";
import System from "./pages/System.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import RoomCreate from "./pages/RoomCreate.vue";
import MyPageTop from "./pages/MyPage/MyPageTop.vue";
import Profile from "./pages/MyPage/Profile.vue";
import Setting from "./pages/MyPage/Setting.vue";
import TodoTop from "./pages/MyPage/TodoPage/TodoTop.vue";
import TodoList from "./pages/MyPage/TodoPage/TodoList.vue";
import ShoppingList from "./pages/MyPage/TodoPage/ShoppingList.vue";
import ExpensesTop from "./pages/MyPage/expenses/ExpensesTop.vue";
import ExpensesList from "./pages/MyPage/expenses/ExpensesList.vue";
import ExpensesChart from "./pages/MyPage/expenses/ExpensesChart.vue";
import ExpensesCreate from "./pages/MyPage/expenses/expensesCreate.vue";
import { isEmpty } from "lodash";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Top,
        beforeEnter(to, from, next) {
            if (store.getters["auth/roomName"]) {
                const roomName = store.getters["auth/roomName"];
                next(`/${roomName}`);
            } else if (store.getters["auth/check"] && !store.getters["auth/roomName"]) {
                next("/room.create");
            } else {
                next();
            }
        }
    },
    {
        path: "/500",
        component: System
    },
    {
        path: "/login",
        component: Login,
        beforeEnter(to, from, next) {
            if (store.getters["auth/roomName"]) {
                const roomName = store.getters["auth/roomName"];
                next(`/${roomName}`);
            } else if (store.getters["auth/check"] && !store.getters["auth/roomName"]) {
                next("/room.create");
            } else {
                next();
            }
        }
    },
    {
        path: "/register",
        component: Register,
        beforeEnter(to, from, next) {
            if (store.getters["auth/roomName"]) {
                const roomName = store.getters["auth/roomName"];
                next(`/${roomName}`);
            } else if (store.getters["auth/check"] && !store.getters["auth/roomName"]) {
                next("/room.create");
            } else {
                next();
            }
        }
    },
    {
        path: "/room.create",
        component: RoomCreate,
        beforeEnter(to, from, next) {
            if (store.getters["auth/roomName"]) {
                const roomName = store.getters["auth/roomName"];
                next(`/${roomName}`);
            } else {
                next();
            }
        }
    },
    {
        path: "/:roomname",
        component: MyPageTop,
        name: "myPageTop",
        children: [
            {
                path: "profile",
                component: Profile,
                name: "profile"
            },
            {
                path: "setting",
                component: Setting,
                name: "setting"
            },
            {
                path: "expensesCreate",
                component: ExpensesCreate,
                name: "expensesCreate"
            },
            {
                path: "todo",
                component: TodoTop,
                name: "todo",
                children: [
                    {
                        path: "list",
                        name: "todoList",
                        component: TodoList
                    },
                    {
                        path: "shoppinglist",
                        name: "shoppingList",
                        component: ShoppingList
                    }
                ]
            },
            {
                path: "expenses",
                name: "expenses",
                component: ExpensesTop,
                children: [
                    {
                        path: "list",
                        name: "expensesList",
                        component: ExpensesList
                    },
                    {
                        path: "expenseschart",
                        name: "expensesChart",
                        component: ExpensesChart
                    }
                ]
            }
        ],
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"] && store.getters["auth/roomName"]) {
                next();
            } else {
                next("/");
            }
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
