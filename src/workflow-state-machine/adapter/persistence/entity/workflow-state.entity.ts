import { WorkflowStepEntity } from 'src/workflow/adapter/persistence/entity/workflow-step.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workflow_state')
export class WorkflowStateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => WorkflowStepEntity, {
    eager: false,
  })
  step: WorkflowStepEntity;

  @Column({ default: false })
  initial: boolean;

  @Column({ default: false })
  final: boolean;
}
