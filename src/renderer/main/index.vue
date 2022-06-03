

<script setup lang="ts">
import Modler from './modler/index.vue';
import RightPanel from './rightPanel/index.vue';
</script>

<template>
<div class="wrapper">
    <div class="titlePlaceHolder"></div>
    <div class="main">
    <div class="flexCenter">
    <Modler></Modler>
    <RightPanel/>
    </div>
    </div>
</div>
</template>

<style>
.wrapper{
    height: 100%;
    overflow: hidden;
}
.titlePlaceHolder{
    height: var(--titleHeight);
    background: red;
}
</style>