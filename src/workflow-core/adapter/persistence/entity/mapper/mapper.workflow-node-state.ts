import { WorkflowNodeState } from 'src/workflow-core/domain/workflow-node-state';
import { WorkflowNodeStateEntity } from '../workflow-node-state.entity';
import { WorkflowNodeEntity } from '../workflow-node.entity';
import { WorkflowEntity } from '../workflow.entity';

export class MapperWorkflowNodeState {
  static toDomain(entity: WorkflowNodeStateEntity): WorkflowNodeState {
    if (!entity) throw new Error('Entity cannot be null');

    return new WorkflowNodeState(
      entity.id,
      entity.workflow.id,
      entity.workflowNode.id,
      entity.nodeType,
      entity.value,
    );
  }

  static toEntity(domain: WorkflowNodeState): WorkflowNodeStateEntity {
    if (!domain) throw new Error('Domain cannot be null');

    const entity = new WorkflowNodeStateEntity();
    entity.id = domain.id;
    entity.workflow = { id: domain.workflowId } as WorkflowEntity;
    entity.workflowNode = { id: domain.nodeId } as WorkflowNodeEntity;
    entity.nodeType = domain.nodeType;
    entity.value = domain.value;

    return entity;
  }

  static toDomainArray(
    entities: WorkflowNodeStateEntity[],
  ): WorkflowNodeState[] {
    return entities?.map((entity) => this.toDomain(entity)) || [];
  }

  static toEntityArray(
    domains: WorkflowNodeState[],
  ): WorkflowNodeStateEntity[] {
    return domains?.map((domain) => this.toEntity(domain)) || [];
  }
}
