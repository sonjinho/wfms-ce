import { WorkflowNodeType } from 'src/workflow-core/domain/workflow-node-type';
import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { WorkflowNodeConnectionEntity } from './workflow-node-connection.entity';
import { WorkflowNodeStateEntity } from './workflow-node-state.entity';
import { WorkflowEntity } from './workflow.entity';

@Entity('workflow_node')
@TableInheritance({
  column: 'nodeType',
})
export abstract class WorkflowNodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkflowEntity, (workflow) => workflow.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workflow_id' })
  workflow: WorkflowEntity;

  @OneToMany(
    () => WorkflowNodeStateEntity,
    (workflowNodeState) => workflowNodeState.workflowNode,
    {
      cascade: true,
    },
  )
  states: WorkflowNodeStateEntity[];

  @OneToMany(
    () => WorkflowNodeConnectionEntity,
    (workflowNodeConnection) => workflowNodeConnection.sourceNode,
    {
      cascade: true,
    },
  )
  connections: WorkflowNodeConnectionEntity[];

  @Column({
    type: 'enum',
    enum: WorkflowNodeType,
  })
  nodeType: WorkflowNodeType;
}

// FormNode
@ChildEntity()
export class FormNodeEntity extends WorkflowNodeEntity {
  @Column({
    type: 'enum',
    enum: WorkflowNodeType,
    default: WorkflowNodeType.FORM,
  })
  nodeType: WorkflowNodeType.FORM;

  @Column()
  formId: string;
}

// LogicNode
@ChildEntity()
export class LogicNodeEntity extends WorkflowNodeEntity {
  @Column({
    type: 'enum',
    enum: WorkflowNodeType,
    default: WorkflowNodeType.LOGIC,
  })
  nodeType: WorkflowNodeType.LOGIC;
}

// TriggerNode
@ChildEntity()
export class TriggerNodeEntity extends WorkflowNodeEntity {
  @Column({
    type: 'enum',
    enum: WorkflowNodeType,
    default: WorkflowNodeType.TRIGGER,
  })
  nodeType: WorkflowNodeType.TRIGGER;

  @Column()
  eventId: string;
}

// ActionNode
@ChildEntity()
export class ActionNodeEntity extends WorkflowNodeEntity {
  @Column({
    type: 'enum',
    enum: WorkflowNodeType,
    default: WorkflowNodeType.ACTION,
  })
  nodeType: WorkflowNodeType.ACTION;

  @Column()
  actionId: string;
}

// EndNode
@ChildEntity()
export class EndNodeEntity extends WorkflowNodeEntity {
  @Column({
    type: 'enum',
    enum: WorkflowNodeType,
    default: WorkflowNodeType.END,
  })
  nodeType: WorkflowNodeType.END;

  @Column()
  terminated: boolean;
}
