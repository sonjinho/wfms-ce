import { WorkflowTransition } from './workflow-transition';

export class WorkflowState {
  public readonly id?: string;
  public readonly order: number;
  public readonly name: string;
  public readonly workflowId: number;
  public readonly stepId: number;
  public readonly init: boolean = false;
  public readonly final: boolean = false;

  // 상태에서 전이를 관리하는 방식으로, 단방향 관계로 연결
  public readonly outgoingTransitions?: WorkflowTransition[];

  // partial constructor
  constructor(name: string, order: number, stepId: number) {
    this.name = name;
    this.order = order;
    this.stepId = stepId;
  }
}
/* 
  example
  Workflow: 고객 정보 관리
  Step1: 고객 정보 입력
  Step2: 회사 정보 입력
  Step3: 기타 정보 입력
 */
