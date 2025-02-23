import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadWorkflowStepPort } from 'src/workflow/application/ports/out/workflow-step/load.workflow-step.port';
import { UpdateWorkflowStepPort } from 'src/workflow/application/ports/out/workflow-step/update.workflow-step.port';
import { WorkflowStep } from 'src/workflow/domain/workflow.step';
import { Repository } from 'typeorm';
import { WorkflowStepEntity } from './entity/workflow-step.entity';
import { mapToWorkflowStepDomain } from './entity/workflow.mapper';

@Injectable()
export class WorkflowStepPersistenceAdapter
  implements LoadWorkflowStepPort, UpdateWorkflowStepPort
{
  constructor(
    @InjectRepository(WorkflowStepEntity)
    private workflowStepRepository: Repository<WorkflowStepEntity>,
  ) {}

  async findOne(id: number): Promise<WorkflowStep> {
    const entity = await this.workflowStepRepository.findOneBy({ id });
    if (!entity) throw new Error('WorkflowStep not found');
    return mapToWorkflowStepDomain(entity);
  }
  async findAll(workflowId: number): Promise<WorkflowStep[]> {
    const entities = await this.workflowStepRepository.find({
      where: { workflow: { id: workflowId } },
    });
    return entities.map(mapToWorkflowStepDomain);
  }
  async create(workflowStep: WorkflowStep): Promise<WorkflowStep> {
    const entity = this.workflowStepRepository.create({
      workflow: { id: workflowStep.workflowId },
      name: workflowStep.name,
      description: workflowStep.description,
    });

    const savedEntity = await this.workflowStepRepository.save(entity);

    return mapToWorkflowStepDomain(savedEntity);
  }
  async update(id: number, workflowStep: WorkflowStep): Promise<WorkflowStep> {
    const existEntity = await this.workflowStepRepository.findOneBy({ id });

    if (!existEntity) {
      throw new Error('WorkflowStep not found');
    }

    existEntity.name = workflowStep.name;
    existEntity.description = workflowStep.description;

    const savedEntity = await this.workflowStepRepository.save(existEntity);
    return mapToWorkflowStepDomain(savedEntity);
  }

  async remove(id: number): Promise<void> {
    return this.workflowStepRepository.delete(id).then(() => {});
  }
}
