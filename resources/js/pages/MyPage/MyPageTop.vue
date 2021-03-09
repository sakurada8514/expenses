<template>
<div>
    <router-link :to="{name:'myPageTop'}">ホーム</router-link>
    <router-link :to="{name:'todoList'}">TODOリスト</router-link>
    <router-link :to="{name:'expensesList'}">家計簿</router-link>
    <router-link :to="{name:'setting'}">設定</router-link>
    <router-link :to="{name:'profile'}">プロフィール</router-link>
    <router-link :to="{name:'expensesCreate'}">支出追加</router-link>
    <router-link :to="{name:'todoCreate'}">ToDo追加</router-link>
    <router-view></router-view>
</div>
</template>