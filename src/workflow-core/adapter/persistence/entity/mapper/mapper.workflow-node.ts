import {
  ActionNode,
  EndNode,
  FormNode,
  LogicNode,
  TriggerNode,
  WorkflowNode,
} from 'src/workflow-core/domain/workflow-node';
import { MapperWorkflowNodeConnection } from './mapper.workflow-node-connection';
import { MapperWorkflowNodeState } from './mapper.workflow-node-state';
import {
  ActionNodeEntity,
  EndNodeEntity,
  FormNodeEntity,
  LogicNodeEntity,
  TriggerNodeEntity,
  WorkflowNodeEntity,
} from '../workflow-node.entity';

export class MapperWorkflowNode {
  // Convert Entity to Domain
  static toDomain(entity: WorkflowNodeEntity): WorkflowNode {
    if (!entity) throw new Error('Entity cannot be null');

    const workflowId = entity.workflow?.id; // Assuming WorkflowEntity has an id field
    const states =
      entity.states?.map((state) => MapperWorkflowNodeState.toDomain(state)) ||
      [];

    const connections =
      entity.connections?.map((connection) =>
        MapperWorkflowNodeConnection.toDomain(connection),
      ) || [];
    if (entity instanceof FormNodeEntity) {
      return new FormNode(
        entity.id,
        workflowId,
        states,
        entity.formId,
        connections,
      );
    }

    if (entity instanceof TriggerNodeEntity) {
      return new TriggerNode(
        entity.id,
        workflowId,
        states,
        entity.eventId,
        connections,
      );
    }

    if (entity instanceof LogicNodeEntity) {
      return new LogicNode(entity.id, workflowId, states, connections);
    }

    if (entity instanceof ActionNodeEntity) {
      return new ActionNode(
        entity.id,
        workflowId,
        states,
        entity.actionId,
        connections,
      );
    }

    if (entity instanceof EndNodeEntity) {
      return new EndNode(
        entity.id,
        workflowId,
        states,
        entity.terminated,
        connections,
      );
    }

    throw new Error('Unknown WorkflowNodeEntity type');
  }

  // Convert Domain to Entity
  static toEntity(domain: WorkflowNode): WorkflowNodeEntity {
    if (!domain) throw new Error('Domain cannot be null');

    let entity: WorkflowNodeEntity;

    if (domain instanceof FormNode) {
      entity = new FormNodeEntity();
      (entity as FormNodeEntity).formId = domain.formId;
    } else if (domain instanceof TriggerNode) {
      entity = new TriggerNodeEntity();
      (entity as TriggerNodeEntity).eventId = domain.eventId;
    } else if (domain instanceof LogicNode) {
      entity = new LogicNodeEntity();
    } else if (domain instanceof ActionNode) {
      entity = new ActionNodeEntity();
      (entity as ActionNodeEntity).actionId = domain.actionId;
    } else if (domain instanceof EndNode) {
      entity = new EndNodeEntity();
      (entity as EndNodeEntity).terminated = domain.terminated;
    } else {
      throw new Error('Unknown WorkflowNode type');
    }

    entity.id = domain.id;
    entity.states =
      domain.states?.map((state) => MapperWorkflowNodeState.toEntity(state)) ||
      [];
    return entity;
  }
}
