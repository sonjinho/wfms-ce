import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowStateEntity } from './workflow-state.entity';

@Entity('workflow_transition')
export class WorkflowTransitionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => WorkflowStateEntity)
  @JoinColumn({ name: 'from_state_id' })
  fromState: WorkflowStateEntity;

  @ManyToOne(() => WorkflowStateEntity, { nullable: true })
  @JoinColumn({ name: 'to_state_id' })
  toState: WorkflowStateEntity;

  @Column()
  condition: string;

  @Column()
  eventId: string;
}
