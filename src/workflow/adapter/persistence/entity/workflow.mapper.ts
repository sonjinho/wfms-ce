/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { WorkflowItem } from 'src/workflow/domain/workflow';
import { WorkflowStepInput } from 'src/workflow/domain/workflow-step-input';
import { WorkflowStep } from 'src/workflow/domain/workflow.step';
import { WorkflowStepInputEntity } from './workflow-step-input.entity';
import { WorkflowStepEntity } from './workflow-step.entity';
import { WorkflowEntity } from './workflow.entity';

export function mapToWorkflowDomain(entity: WorkflowEntity): WorkflowItem {
  return new WorkflowItem(
    entity.id,
    entity.code,
    entity.name,
    entity.description,
    entity.tags,
    entity.createdAt,
    entity.updatedAt,
  );
}

export function mapToWorkflowStepDomain(
  entity: WorkflowStepEntity,
): WorkflowStep {
  return new WorkflowStep(
    entity.id,
    entity.workflow.id,
    entity.name,
    entity.description,
    entity.workflowInputs.map((input) => mapToWorkflowInputDomain(input)),
  );
}
export function mapToWorkflowInputDomain(
  entity: WorkflowStepInputEntity,
): WorkflowStepInput {
  const {
    id,
    workflow: { id: workflowId },
    workflowStep: { id: stepId },
    order,
    isRequired,
    isSummary,
    isGlobal,
    name,
    label,
    type,
    minValue,
    maxValue,
    minDate,
    maxDate,
    multiple,
    options,
  } = entity;

  return new WorkflowStepInput({
    id,
    workflowId,
    stepId,
    order,
    isRequired,
    isSummary,
    isGlobal,
    name,
    label,
    type,
    minValue,
    maxValue,
    minDate,
    maxDate,
    multiple,
    options,
  });
}
