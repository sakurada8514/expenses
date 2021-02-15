<template>
<div>
<router-link :to="{name:'todoList'}">TODOリスト</router-link>
<router-link :to="{name:'shoppingList'}">買い物リスト</router-link>
<router-view></router-view>
</div>
</template>