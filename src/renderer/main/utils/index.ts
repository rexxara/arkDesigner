import { BPMNElement } from "@renderer/main/types/Bpmntypes";

export function selectionIsEqual(eventSelection: BPMNElement[], newSelectionMap: { [key: string]: BPMNElement; }) {
    const newSelectionIds = Object.keys(newSelectionMap);
    if (eventSelection.length === newSelectionIds.length) {
        const error = eventSelection.find(v => !newSelectionMap[v.id])
        if (!error) {
            return true
        }
    }
    return false;
}

