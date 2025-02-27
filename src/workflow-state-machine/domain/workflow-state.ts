import { WorkflowTransition } from './workflow-transition';

export class WorkflowState {
  public readonly id?: string;
  public readonly order: number;
  public readonly name: string;
  public readonly stepId: number;

  // 상태에서 전이를 관리하는 방식으로, 단방향 관계로 연결
  public readonly outgoingTransitions?: WorkflowTransition[];

  // partial constructor
  constructor(name: string, order: number, stepId: number) {
    this.name = name;
    this.order = order;
    this.stepId = stepId;
  }
}
