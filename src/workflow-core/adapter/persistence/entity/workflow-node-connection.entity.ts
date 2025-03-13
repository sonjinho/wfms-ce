import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowNodeEntity } from './workflow-node.entity';

@Entity('workflow_node_connection')
export class WorkflowNodeConnectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('jsonb', { nullable: true })
  condition: object;

  @ManyToOne(() => WorkflowNodeEntity, { nullable: false })
  @JoinColumn({ name: 'source_node_id' })
  sourceNode: WorkflowNodeEntity;

  @ManyToOne(() => WorkflowNodeEntity, { nullable: false })
  @JoinColumn({ name: 'target_node_id' })
  targetNode: WorkflowNodeEntity;
}
