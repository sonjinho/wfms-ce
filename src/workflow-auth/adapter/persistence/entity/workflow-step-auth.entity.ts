import { WorkflowStepPermission } from 'src/workflow-auth/domain/workflow-step-permissions';
import { WorkflowStepEntity } from 'src/workflow/adapter/persistence/entity/workflow-step.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workflow_step_auths')
export class WorkflowStepAuthEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => WorkflowStepEntity, (workflowStep) => workflowStep.id)
  @JoinColumn()
  workflowStep: number;
  @Column('json', { nullable: false, name: 'group_permissions' })
  groupPermissions: Record<string, WorkflowStepPermission[]>;
}
