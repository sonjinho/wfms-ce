import { WorkflowPermission } from 'src/workflow-auth/domain/workflow-permissions';
import { WorkflowEntity } from 'src/workflow/adapter/persistence/entity/workflow.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
