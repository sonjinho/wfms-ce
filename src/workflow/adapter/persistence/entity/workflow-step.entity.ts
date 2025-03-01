import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowStepInputEntity } from './workflow-step-input.entity';
import { WorkflowEntity } from './workflow.entity';

@Entity('workflow_step')
export class WorkflowStepEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => WorkflowEntity, (workflow) => workflow.id)
  workflow: WorkflowEntity;
  @Column({ type: 'varchar', name: 'step_name', length: 255, nullable: false })
  name: string;
  @Column({
    type: 'varchar',
    name: 'description',
    length: 1000,
    nullable: true,
  })
  @Column()
  oder: number;
  @Column({ default: false })
  init: boolean;
  @Column({ default: false })
  final: boolean;
  description: string;
  @OneToMany(
    () => WorkflowStepInputEntity,
    (workflowInput) => workflowInput.workflowStep,
    { eager: true },
  )
  workflowInputs: WorkflowStepInputEntity[];
}
