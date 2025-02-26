import { WorkflowStepPermission } from 'src/workflow-auth/domain/workflow-step-permissions';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowStepEntity } from '../../../../../workflow/adapter/persistence/workflow/entity/workflow-step.entity';

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
