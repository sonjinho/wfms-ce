/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export enum WorkflowInputType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  SELECT = 'SELECT',
  FILE = 'FILE',
  LONG_TEXT = 'LONG_TEXT',
}
export class WorkflowStepInput {
  public readonly id?: number;
  public workflowId: number;
  public stepId: number;
  public order: number;
  public readonly isRequired: boolean = false;
  public readonly isSummary: boolean = false;
  public readonly isGlobal: boolean = false;
  public readonly name: string;
  public readonly label: string;
  public readonly type: WorkflowInputType = WorkflowInputType.TEXT;
  public readonly minValue: number = 0;
  public readonly maxValue: number = 1;
  public readonly minDate: Date = new Date();
  public readonly maxDate: Date = new Date();
  public readonly multiple: boolean = false;
  public readonly options: any = {};

  constructor(props: Partial<WorkflowStepInput>) {
    this.validate();

    this.id = props.id;
    this.workflowId = props.workflowId ?? 0;
    this.stepId = props.stepId ?? 0;
    this.order = props.order ?? 0;
    this.isRequired = props.isRequired ?? false;
    this.isSummary = props.isSummary ?? false;
    this.isGlobal = props.isGlobal ?? false;
    this.name =
      props.name ??
      `w_${this.workflowId}_${this.stepId}_${this.label}`
        .replaceAll(/\\(.)/g, '$1')
        .replaceAll(/[\s-]/g, '');
    this.label = props.label ?? '';
    this.type = props.type ?? WorkflowInputType.TEXT;
    this.minValue = props.minValue ?? 0;
    this.maxValue = props.maxValue ?? 1;
    this.minDate = props.minDate ?? new Date();
    this.maxDate = props.maxDate ?? new Date();
    this.multiple = props.multiple ?? false;
    this.options = props.options ?? {};
  }

  private validate() {
    if (!this.label) {
      throw new Error('label is required');
    }
  }
}
