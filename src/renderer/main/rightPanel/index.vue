<template>
  <div>
    <div class="rightPanel">
      <div v-if="selectedElements[0]?.id">
        <ElementPanel :elementId="selectedElements[0]?.id" />
      </div>
      
      <div v-if="!selectedElements[0]?.id">
        <GlobalPanel />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import useStoreTemplate from "@store/template";
import { storeToRefs } from "pinia";
import ElementPanel from "./element/index.vue";
import GlobalPanel from "./global.vue";
const store = useStoreTemplate();
const { selectedElements } = storeToRefs(store);
</script>

<style scoped>
.rightPanel {
  width: 400px;
  height: calc(100vh - var(--titleHeight));
  background: gray;
}
</style>