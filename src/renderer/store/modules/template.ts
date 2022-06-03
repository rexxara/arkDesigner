import { BPMNElement } from '@renderer/main/types/Bpmntypes';
import { defineStore } from 'pinia'
import store from '../index'

interface StateType {
  testData: string;
  selectedElements: Array<BPMNElement>;
}

const useStore = defineStore({
  id: 'template',
  state: (): StateType => ({
    testData: '',
    selectedElements:[]
  }),
  getters: {
    getTest: (state): string => state.testData,
    getTest1(): string {
      return this.testData
    }
  },
  actions: {
    TEST_ACTION(data: string) {
      this.testData = data
    }
  }
})

export default function useStoreTemplate() {
  return useStore(store)
}
