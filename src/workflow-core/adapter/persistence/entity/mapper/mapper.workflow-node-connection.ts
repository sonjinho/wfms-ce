/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { WorkflowNodeConnection } from 'src/workflow-core/domain/workflow-connection';
import { WorkflowNodeConnectionEntity } from '../workflow-node-connection.entity';
import { WorkflowNodeEntity } from '../workflow-node.entity';

export class MapperWorkflowNodeConnection {
  static toDomain(
    entity: WorkflowNodeConnectionEntity,
  ): WorkflowNodeConnection {
    if (!entity) throw new Error('Entity cannot be null');

    const domain = new WorkflowNodeConnection();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.condition = entity.condition;
    domain.sourceNodeId = entity.sourceNode.id;
    domain.targetNodeId = entity.targetNode.id;

    return domain;
  }

  static toEntity(
    domain: WorkflowNodeConnection,
  ): WorkflowNodeConnectionEntity {
    if (!domain) throw new Error('Domain cannot be null');

    const entity = new WorkflowNodeConnectionEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.condition = domain.condition;
    entity.sourceNode = { id: domain.sourceNodeId } as WorkflowNodeEntity;
    entity.targetNode = { id: domain.targetNodeId } as WorkflowNodeEntity;

    return entity;
  }

  static toDomainArray(
    entities: WorkflowNodeConnectionEntity[],
  ): WorkflowNodeConnection[] {
    return entities?.map((entity) => this.toDomain(entity)) || [];
  }

  static toEntityArray(
    domains: WorkflowNodeConnection[],
  ): WorkflowNodeConnectionEntity[] {
    return domains?.map((domain) => this.toEntity(domain)) || [];
  }
}
