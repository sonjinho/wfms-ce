import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowStepEntity } from './workflow-step.entity';

@Entity('workflows')
export class WorkflowEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    name: 'code',
    length: 255,
    nullable: false,
    unique: true,
  })
  code: string;
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
  @Column('jsonb', {
    nullable: true,
    name: 'tags',
  })
  tags: { [key: string]: string };

  @OneToOne(() => WorkflowStepEntity, (step) => step.workflow, {
    eager: true,
    nullable: true,
  })
  initStep: WorkflowStepEntity;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
