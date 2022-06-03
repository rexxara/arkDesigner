<template>
  <div class="modler">
    <div class="bpmn-canvas"></div>
    <title>{{ store.testData }}</title>
  </div>
</template>


<script setup lang="ts">
import { onUnmounted } from "vue";
import { onMounted } from "vue-demi";
import Modeler from "bpmn-js/lib/Modeler";
import minimapModule from "diagram-js-minimap";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import useStoreTemplate from "@store/template";
import { BPMNElementType, BPMNElement } from "@renderer/main/types/Bpmntypes";
import { selectionIsEqual } from "@renderer/main/utils/index";

const { ipcRenderer, shell } = require("electron");
const store = useStoreTemplate();

defineProps({
  title: String,
});

async function init() {
  const instance = new Modeler({
    bpmnRenderer: {
      defaultFillColor: "rgb(255, 249, 241)",
      defaultStrokeColor: "rgb(240, 204, 150)",
    },
    container: document.querySelector(".bpmn-canvas"),
    keyboard: {
      bindTo: window.document.body,
    },
    additionalModules: [
      //   { moveCanvas: ["value", null] },
      { contextPadProvider: ["value", ""] }, //禁用节点选中菜单
      //   { paletteProvider: ["value", ""] },
      minimapModule,
      //   bpmnCustomTranslateModule,
      //   customModule,
      //   CustomKeyboard,
      //   CustomHandTool,
      // CustomModeling,
      // ConnectionPreview,
      //   CopyPaste,
    ],
  });
  window.bpmnModler = instance;
  await loadBpmn();
  initEventBus(instance);
}
onMounted(() => {
  init();
});
onUnmounted(() => {});

async function loadBpmn() {
  const path = await ipcRenderer.invoke("get-static-path");
  const xml = await fetch(`${path}/bpmn/template.bpmn`).then((data) =>
    data.text()
  );

  window.bpmnModler
    .importXML(xml)
    .then(function () {
      console.log("Success!");
    })
    .catch(function (err) {
      console.error("Error", err);
    });
}

function initEventBus(instance) {
  console.log(instance);
  instance.on("selection.changed", (e) => {
    const selection = instance.get("selection");
    const newLabels = e.newSelection.filter(
      (v) => v.type === BPMNElementType["label"]
    );

    const newSelectionMap = e.newSelection.reduce((map, currentValue) => {
      map[currentValue.id] = currentValue;
      return map;
    }, {} as any) as {
      [key: string]: BPMNElement;
    };

    newLabels.forEach((v) => {
      if (!newSelectionMap[v.labelTarget.id]) {
        newSelectionMap[v.labelTarget.id] = v.labelTarget;
      }
    });

    const newSelectedElements = Object.values(newSelectionMap);
    if (!selectionIsEqual(e.newSelection, newSelectionMap)) {
      selection.select(newSelectedElements);
    }
    store.$patch({ selectedElements: newSelectedElements });
    console.log(store.selectedElements[0]?.id)
  });

  store.$patch({ testData: "rexxara" });
}
</script>

<style scoped>
.modler {
  width: 100%;
  height: calc(100vh - var(--titleHeight));
}
.bpmn-canvas {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
<style >
.djs-minimap {
  position: absolute;
  right: 0;
  top: 0;
}
</style>