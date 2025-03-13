import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowNodeEntity } from './workflow-node.entity';

@Entity('workflow')
export class WorkflowEntity {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column({
    type: 'varchar',
    name: 'workflow_name',
    length: 255,
    nullable: false,
  })
  name: string;
  @Column({
    type: 'varchar',
    name: 'description',
    length: 1000,
    nullable: true,
  })
  description: string;

  @OneToMany(() => WorkflowNodeEntity, (node) => node.workflow, {
    cascade: true,
    eager: true,
  })
  nodes: WorkflowNodeEntity[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;
}
