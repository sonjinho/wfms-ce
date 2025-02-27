import { WorkflowInputType } from 'src/workflow/domain/workflow-step-input';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkflowStepEntity } from './workflow-step.entity';
import { WorkflowEntity } from './workflow.entity';

@Entity('workflow_step_input')
export class WorkflowStepInputEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkflowEntity, (workflow) => workflow.id, { lazy: true })
  workflow: WorkflowEntity;

  @ManyToOne(() => WorkflowStepEntity, (workflowStep) => workflowStep.id, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  workflowStep: WorkflowStepEntity;
  @Column({ name: 'input_order', nullable: false, default: 1 })
  order: number = 1;

  @Column({
    type: 'boolean',
    name: 'is_required',
    nullable: false,
    default: false,
  })
  isRequired: boolean = false;

  @Column({
    type: 'boolean',
    name: 'is_summary',
    nullable: false,
    default: false,
  })
  isSummary: boolean = false;

  @Column({
    type: 'boolean',
    name: 'is_global',
    nullable: false,
    default: false,
  })
  isGlobal: boolean = false;

  @Column({
    type: 'varchar',
    name: 'input_name',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'label',
    length: 255,
    nullable: false,
  })
  label: string;

  @Column({
    type: 'enum',
    enum: WorkflowInputType,
    nullable: false,
    default: WorkflowInputType.TEXT,
  })
  type: WorkflowInputType;
  @Column({ name: 'min_value', nullable: false, default: 0 })
  minValue: number;
  @Column({ name: 'max_value', nullable: false, default: 0 })
  maxValue: number;
  @Column({ name: 'min_date', nullable: true })
  minDate: Date;
  @Column({ name: 'max_date', nullable: true })
  maxDate: Date;
  @Column({ name: 'multiple', nullable: false, default: false })
  multiple: boolean;
  @Column('jsonb', { nullable: true, array: true, name: 'options' })
  options: any;
}
