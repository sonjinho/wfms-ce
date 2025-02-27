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
  return new WorkflowStepInput(
    entity.id,
    entity.workflow.id,
    entity.workflowStep.id,
    entity.order,
    entity.isRequired,
    entity.isSummary,
    entity.isGlobal,
    entity.name,
    entity.label,
    entity.type,
    entity.minValue,
    entity.maxValue,
    entity.minDate,
    entity.maxDate,
    entity.multiple,
    entity.options,
  );
}
