import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Column('hstore', {
    nullable: true,
    name: 'tags',
  })
  tags: { [key: string]: string };

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
