export enum WorkflowInputType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  // 추가적인 타입을 여기에 정의할 수 있습니다.
}
export class WorkflowStepInput {
  public readonly id: number | null;
  public readonly workflowId: number;
  public readonly stepId: number;
  public readonly isRequired: boolean;
  public readonly isSummary: boolean;
  public readonly isGlobal: boolean;
  public readonly name: string;
  public readonly label: string;
  public readonly type: WorkflowInputType;
  public readonly minValue: number;
  public readonly maxValue: number;
  public readonly minDate: Date;
  public readonly maxDate: Date;
  public readonly multiple: boolean;
  public readonly options: string[];

  constructor(
    id: number | null,
    workflowId: number,
    stepId: number,
    isRequired: boolean,
    isSummary: boolean,
    isGlobal: boolean,
    name: string,
    label: string,
    type: WorkflowInputType,
    minValue: number,
    maxValue: number,
    minDate: Date,
    maxDate: Date,
    multiple: boolean,
    options: string[],
  ) {
    this.id = id;
    this.workflowId = workflowId;
    this.stepId = stepId;
    this.isRequired = isRequired;
    this.isSummary = isSummary;
    this.isGlobal = isGlobal;
    this.name = name;
    this.label = label;
    this.type = type;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.multiple = multiple;
    this.options = options;
  }
}
