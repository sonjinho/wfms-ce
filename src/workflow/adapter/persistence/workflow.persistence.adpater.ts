import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWorkflowCommand } from 'src/workflow/application/ports/in/workflow/create.workflow.command';
import { UpdateWorkflowCommand } from 'src/workflow/application/ports/in/workflow/update.workflow.command';
import { LoadWorkflowPort } from 'src/workflow/application/ports/out/workflow/load.workflow.port';
import { UpdateWorkflowPort } from 'src/workflow/application/ports/out/workflow/update.workflow.port';
import { Workflow } from 'src/workflow/domain/workflow';
import { Repository } from 'typeorm';
import { WorkflowEntity } from './entity/workflow.entity';

@Injectable()
export class WorkflowPersistenceAdapter
  implements LoadWorkflowPort, UpdateWorkflowPort
{
  constructor(
    @InjectRepository(WorkflowEntity)
    private workflowRepository: Repository<WorkflowEntity>,
  ) {}
  async findOne(id: number): Promise<Workflow> {
    const workflowEntity = await this.workflowRepository.findOneBy({ id });

    if (!workflowEntity) {
      throw new Error('Workflow not found'); // 예외 처리
    }

    return this.toDomainModel(workflowEntity);
  }

  async findAll(): Promise<Workflow[]> {
    const workflowEntities = await this.workflowRepository.find();
    return workflowEntities.map((entity) => this.toDomainModel(entity));
  }

  async create(createCommand: CreateWorkflowCommand): Promise<Workflow> {
    const workflowEntity = this.workflowRepository.create({
      name: createCommand.name,
      description: createCommand.description,
    } as WorkflowEntity);

    const savedEntity = await this.workflowRepository.save(workflowEntity);
    return this.toDomainModel(savedEntity);
  }

  async update(
    id: number,
    updateCommand: UpdateWorkflowCommand,
  ): Promise<Workflow> {
    const updatedEntity = await this.workflowRepository.save({
      id,
      ...updateCommand,
    });

    if (!updatedEntity) {
      throw new Error('Workflow not found');
    }

    return this.toDomainModel(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.workflowRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Workflow not found');
    }
  }

  private toDomainModel(entity: WorkflowEntity): Workflow {
    return new Workflow(
      entity.id,
      entity.code,
      entity.name,
      entity.description,
      new Map(),
      [],
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
