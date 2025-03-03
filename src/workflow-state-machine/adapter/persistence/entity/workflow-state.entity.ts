import { WorkflowStepEntity } from 'src/workflow/adapter/persistence/entity/workflow-step.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowTransitionEntity } from './workflow-transition.entity';

@Entity('workflow_state')
export class WorkflowStateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => WorkflowStepEntity, {
    eager: false,
    onDelete: 'CASCADE',
  })
  step: WorkflowStepEntity;

  @Column({ default: false })
  initial: boolean;

  @Column({ default: false })
  final: boolean;

  @OneToMany(
    () => WorkflowTransitionEntity,
    (transition) => transition.fromState,
    {
      eager: true,
    },
  )
  transitions: WorkflowTransitionEntity[];
}
