import { WorkflowPermission } from 'src/workflow-auth/domain/workflow-permissions';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowEntity } from '../../../../../workflow/adapter/persistence/workflow/entity/workflow.entity';

@Entity('workflow_auths')
export class WorkflowAuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => WorkflowEntity, { nullable: false })
  @JoinColumn()
  workflow: WorkflowEntity;

  @Column('json', {
    nullable: false,
    name: 'group_permissions',
  })
  groupPermissions: Record<string, WorkflowPermission[]>;
}
