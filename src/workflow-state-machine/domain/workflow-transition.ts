import { WorkflowState } from './workflow-state';

/**
 * WorkflowTransition 클래스는 상태 전이를 나타냅니다.
 * 각 전이는 특정 상태에서 다른 상태로의 변화를 정의합니다.
 *
 * @class
 */
export class WorkflowTransition {
  /**
   * 전이의 고유 식별자 (선택 사항)
   * @type {string | undefined}
   */
  public readonly id?: string;

  /**
   * 전이의 이름을 정의합니다.
   * 예를 들어, "작업 시작", "승인 완료"와 같은 전이 이름을 가질 수 있습니다.
   * @type {string}
   */
  public readonly name: string;

  /**
   * 현재 상태(출발 상태)를 정의합니다.
   * 전이가 시작되는 상태입니다.
   * @type {WorkflowState}
   */
  public readonly fromState: WorkflowState;

  /**
   * 목표 상태(도착 상태)를 정의합니다.
   * 전이가 완료된 후 도달하는 상태입니다.
   * @type {WorkflowState}
   */
  public readonly toState: WorkflowState;

  /**
   * 전이가 발생하기 위한 조건을 정의합니다.
   * 예를 들어, "작업이 완료되었을 때"와 같은 조건을 포함할 수 있습니다.
   * @type {string}
   */
  public readonly condition: string;

  /**
   * 전이가 발생할 때 수행해야 할 액션을 정의합니다.
   * 예를 들어, "알림 전송"과 같은 작업을 설정할 수 있습니다.
   * @type {string}
   */
  public readonly eventId: string;

  /**
   * WorkflowTransition 클래스의 생성자입니다.
   * 상태 전이를 생성할 때 필요한 값을 받습니다.
   *
   * @param {string} name - 전이의 이름
   * @param {WorkflowState} fromState - 현재 상태 (출발 상태)
   * @param {WorkflowState} toState - 목표 상태 (도착 상태)
   * @param {string} condition - 전이가 발생하는 조건
   * @param {string} action - 전이가 발생할 때 수행할 액션
   */
  constructor(
    name: string,
    fromState: WorkflowState,
    toState: WorkflowState,
    condition: string,
    action: string,
    id?: string,
  ) {
    this.name = name;
    this.fromState = fromState;
    this.toState = toState;
    this.condition = condition;
    this.eventId = action;
    this.id = id;
  }
}
