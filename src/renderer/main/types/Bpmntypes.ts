
import { Base, ModdleElement } from "diagram-js/lib/model";

export enum BPMNElementType {
    'bpmn:SequenceFlow' = 'bpmn:SequenceFlow',//箭头
    'bpmn:UserTask' = 'bpmn:UserTask',
    'bpmn:StartEvent' = 'bpmn:StartEvent',
    'bpmn:EndEvent' = 'bpmn:EndEvent',
    "label" = "label",
    "bpmn:Process" = "bpmn:Process",//root
    "bpmn:ExclusiveGateway" = "bpmn:ExclusiveGateway",
    "bpmn:ParallelGateway" = "bpmn:ParallelGateway",
    "bpmn:InclusiveGateway" = "bpmn:InclusiveGateway",
    "bpmn:TextAnnotation" = "bpmn:TextAnnotation",
    "bpmn:ServiceTask" = "bpmn:ServiceTask"
}
export type BusinessObject = {
    name: string;
    $type: BPMNElement['type'];
    id: string;
    eventDefinitions?: Array<ModdleElement>;
    conditionExpression?: any;
}


export type ExtensionElements = {
    values: Array<any>;
}
export type BPMNElement = {
    children: Array<any>;
    collapsed: boolean;
    height: number;
    width: number;
    hidden?: any;
    id: string;
    isFrame: boolean;
    labels: Array<any>;
    x: number;
    y: number;
    type: keyof typeof BPMNElementType;
    businessObject: BusinessObject;
    attachers?: Array<BPMNElement>;
    extensionElements: ExtensionElements;
} & Base | Base;