import { WorkflowNodeConnection } from './workflow-connection';
import { WorkflowNodeState } from './workflow-node-state';
import { WorkflowNodeType } from './workflow-node-type';

export class WorkflowNode {
  constructor(
    public id: string,
    public workflowId: string,
    public nodeType: WorkflowNodeType,
    public states: WorkflowNodeState[],
    public connections?: WorkflowNodeConnection[],
  ) {}
}

export class FormNode extends WorkflowNode {
  constructor(
    id: string,
    workflowId: string,
    states: WorkflowNodeState[],
    public formId: string,
    connections?: WorkflowNodeConnection[],
  ) {
    super(id, workflowId, WorkflowNodeType.FORM, states, connections);
  }
}

export class TriggerNode extends WorkflowNode {
  constructor(
    id: string,
    workflowId: string,
    states: WorkflowNodeState[],
    public eventId: string,
    connections?: WorkflowNodeConnection[],
  ) {
    super(id, workflowId, WorkflowNodeType.TRIGGER, states, connections);
  }
}

export class LogicNode extends WorkflowNode {
  constructor(
    id: string,
    workflowId: string,
    states: WorkflowNodeState[],
    connections?: WorkflowNodeConnection[],
  ) {
    super(id, workflowId, WorkflowNodeType.LOGIC, states, connections);
  }
}

export class ActionNode extends WorkflowNode {
  constructor(
    id: string,
    workflowId: string,
    states: WorkflowNodeState[],
    public actionId: string,
    connections?: WorkflowNodeConnection[],
  ) {
    super(id, workflowId, WorkflowNodeType.ACTION, states, connections);
  }
}

export class EndNode extends WorkflowNode {
  constructor(
    id: string,
    workflowId: string,
    states: WorkflowNodeState[],
    public terminated: boolean,
    connections?: WorkflowNodeConnection[],
  ) {
    super(id, workflowId, WorkflowNodeType.END, states, connections);
  }
}
