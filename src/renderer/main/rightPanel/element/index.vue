<template>
  <div>
      {{props.elementId}}
  </div>
</template>


<script setup lang="ts">

const props=defineProps({
  elementId: String,
});


</script>

<style scoped>
</style>