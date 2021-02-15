<template>
<div>
<router-link :to="{name:'expensesList'}">家計簿リスト</router-link>
<router-link :to="{name:'expensesChart'}">家計簿グラフ</router-link>
<router-view></router-view>
</div>
</template>