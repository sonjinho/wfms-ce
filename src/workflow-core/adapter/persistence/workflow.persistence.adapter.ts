import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowPort } from 'src/workflow-core/application/port/out/workflow.port';
import { Workflow } from 'src/workflow-core/domain/workflow';
import { Repository } from 'typeorm';
import { MapperWorkflow } from './entity/mapper/mapper.workflow';
import { WorkflowEntity } from './entity/workflow.entity';

@Injectable()
export class WorkflowPersistenceAdapter implements WorkflowPort {
  constructor(
    @InjectRepository(WorkflowEntity)
    private readonly workflowRepository: Repository<WorkflowEntity>,
  ) {}
  search(): Promise<Workflow[]> {
    return this.workflowRepository.find().then((res) => {
      return res.map((item) => MapperWorkflow.toDomain(item));
    });
  }

  async load(id: string): Promise<Workflow> {
    const entity = await this.workflowRepository.findOne({
      where: { id: id },
      relations: ['nodes'],
    });
    if (!entity) throw new Error('Workflow not found');
    return MapperWorkflow.toDomain(entity);
  }

  async create(workflow: Workflow): Promise<Workflow> {
    const entity = MapperWorkflow.toEntity(workflow);
    return this.workflowRepository.save(entity).then((res) => {
      return MapperWorkflow.toDomain(res);
    });
  }

  async delete(id: string): Promise<boolean> {
    return this.workflowRepository.delete(id).then((res) => {
      return (res.affected ?? 0) > 0;
    });
  }

  async update(id: string, workflow: Workflow): Promise<Workflow> {
    const entity = MapperWorkflow.toEntity(workflow);
    entity.id = id;
    return this.workflowRepository.save(entity).then((res) => {
      return MapperWorkflow.toDomain(res);
    });
  }
}
