import VueRouter from "vue-router";
import Vue from "vue";

import Top from "./pages/Top.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import MyPageTop from "./pages/MyPage/MyPageTop.vue";
import Profile from "./pages/MyPage/Profile.vue";
import Setting from "./pages/MyPage/Setting.vue";
import TodoTop from "./pages/MyPage/TodoPage/TodoTop.vue";
import TodoList from "./pages/MyPage/TodoPage/TodoList.vue";
import ShoppingList from "./pages/MyPage/TodoPage/ShoppingList.vue";
import ExpensesTop from "./pages/MyPage/expenses/ExpensesTop.vue";
import ExpensesList from "./pages/MyPage/expenses/ExpensesList.vue";
import ExpensesChart from "./pages/MyPage/expenses/ExpensesChart.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Top
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/:name",
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
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;