import { WorkflowNodeType } from 'src/workflow-core/domain/workflow-node-type';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowNodeEntity } from './workflow-node.entity';
import { WorkflowEntity } from './workflow.entity';

@Entity('workflow_node_states')
export class WorkflowNodeStateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkflowEntity, (workflow) => workflow.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workflow_id' })
  workflow: WorkflowEntity;

  @ManyToOne(() => WorkflowNodeEntity, (workflowNode) => workflowNode.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'node_id' })
  workflowNode: WorkflowNodeEntity;

  @Column({
    type: 'enum',
    enum: WorkflowNodeType,
    name: 'node_type',
    nullable: false,
  })
  nodeType: WorkflowNodeType;

  @Column({ type: 'varchar', name: 'value', nullable: false })
  value: string;
}
