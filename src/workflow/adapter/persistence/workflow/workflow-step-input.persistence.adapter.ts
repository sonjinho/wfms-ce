import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadWorkflowStepInputPort } from 'src/workflow/application/ports/out/workflow-step-input/load.workflow-step-input.port';
import { UpdateWorkflowStepInputPort } from 'src/workflow/application/ports/out/workflow-step-input/update.workflow-step-input.port';
import { WorkflowStepInput } from 'src/workflow/domain/workflow-step-input';
import { Repository } from 'typeorm';
import { WorkflowStepInputEntity } from './entity/workflow-step-input.entity';
import { mapToWorkflowInputDomain } from './entity/workflow.mapper';

@Injectable()
export class WorkflowStepInputPersistenceAdapter
  implements LoadWorkflowStepInputPort, UpdateWorkflowStepInputPort
{
  constructor(
    @InjectRepository(WorkflowStepInputEntity)
    private workflowStepInputRepository: Repository<WorkflowStepInputEntity>,
  ) {}

  private readonly logger = new Logger(
    WorkflowStepInputPersistenceAdapter.name,
  );

  async findByStepId(stepId: number): Promise<WorkflowStepInput[]> {
    return this.workflowStepInputRepository
      .findBy({
        workflowStep: { id: stepId },
      })
      .then((stepInputs) =>
        stepInputs.map((stepInput) => mapToWorkflowInputDomain(stepInput)),
      );
  }
  async findByWorkflowId(workflowId: number): Promise<WorkflowStepInput[]> {
    const stepInputs = await this.workflowStepInputRepository.findBy({
      workflow: { id: workflowId },
    });
    return stepInputs.map((stepInput) => mapToWorkflowInputDomain(stepInput));
  }
  async findOne(id: number): Promise<WorkflowStepInput> {
    const stepInput = await this.workflowStepInputRepository.findOneBy({ id });
    if (!stepInput) throw new Error('WorkflowStepInput not found');
    return mapToWorkflowInputDomain(stepInput);
  }
  async create(
    workflowStepInput: WorkflowStepInput,
  ): Promise<WorkflowStepInput> {
    const entity = this.workflowStepInputRepository.create({
      workflow: { id: workflowStepInput.workflowId },
      workflowStep: { id: workflowStepInput.stepId },
      isRequired: workflowStepInput.isRequired,
      isSummary: workflowStepInput.isSummary,
      isGlobal: workflowStepInput.isGlobal,
      name: workflowStepInput.name,
      label: workflowStepInput.label,
      type: workflowStepInput.type,
      minValue: workflowStepInput.minValue,
      maxValue: workflowStepInput.maxValue,
      minDate: workflowStepInput.minDate,
      maxDate: workflowStepInput.maxDate,
      multiple: workflowStepInput.multiple,
      options: workflowStepInput.options,
    });
    const savedEntity = this.workflowStepInputRepository.save(entity);
    return savedEntity.then((entity) => mapToWorkflowInputDomain(entity));
  }
  async update(
    id: number,
    workflowStepInput: WorkflowStepInput,
  ): Promise<WorkflowStepInput> {
    this.logger.log(id);
    const entity = await this.workflowStepInputRepository.findOneBy({ id });
    if (!entity) throw new Error('WorkflowStepInput not found');
    const updatedEntity = this.workflowStepInputRepository.merge(entity, {
      workflow: { id: workflowStepInput.workflowId },
      workflowStep: { id: workflowStepInput.stepId },
      isRequired: workflowStepInput.isRequired,
      isSummary: workflowStepInput.isSummary,
      isGlobal: workflowStepInput.isGlobal,
      name: workflowStepInput.name,
      label: workflowStepInput.label,
      type: workflowStepInput.type,
      minValue: workflowStepInput.minValue,
      maxValue: workflowStepInput.maxValue,
      minDate: workflowStepInput.minDate,
      maxDate: workflowStepInput.maxDate,
      multiple: workflowStepInput.multiple,
      options: workflowStepInput.options,
    });
    const savedEntity = this.workflowStepInputRepository.save(updatedEntity);
    return savedEntity.then((entity) => mapToWorkflowInputDomain(entity));
  }
  async remove(id: number): Promise<void> {
    return this.workflowStepInputRepository.delete(id).then(() => {});
  }
}
