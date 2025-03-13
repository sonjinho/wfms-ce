import { Workflow } from 'src/workflow-core/domain/workflow';
import { MapperWorkflowNode } from './mapper.workflow-node';
import { WorkflowEntity } from '../workflow.entity';

export class MapperWorkflow {
  /**
   * Converts a WorkflowEntity to a Workflow domain object
   * @param entity The WorkflowEntity to convert
   * @returns A new Workflow domain object
   * @throws Error if entity is null/undefined
   */
  static toDomain(entity: WorkflowEntity): Workflow {
    if (!entity) {
      throw new Error('Workflow entity cannot be null or undefined');
    }

    return new Workflow(
      entity.name,
      entity.description ?? '', // Handle nullable description
      entity.nodes?.map((node) => MapperWorkflowNode.toDomain(node)) ?? [],
      entity.id,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  /**
   * Converts a Workflow domain object to a WorkflowEntity
   * @param domain The Workflow domain object to convert
   * @returns A new WorkflowEntity
   * @throws Error if domain is null/undefined
   */
  static toEntity(domain: Workflow): WorkflowEntity {
    if (!domain) {
      throw new Error('Workflow domain object cannot be null or undefined');
    }

    const entity = new WorkflowEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.description = domain.description;
    entity.nodes =
      domain.nodes?.map((node) => MapperWorkflowNode.toEntity(node)) ?? [];

    // Note: Typically, these are managed by TypeORM automatically
    // Only set them if you want to explicitly override
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    if (domain.deletedAt) entity.deletedAt = domain.deletedAt;

    return entity;
  }

  /**
   * Converts an array of WorkflowEntity to Workflow domain objects
   * @param entities Array of WorkflowEntity objects
   * @returns Array of Workflow domain objects
   */
  static toDomainArray(entities: WorkflowEntity[]): Workflow[] {
    return entities?.map((entity) => this.toDomain(entity)) ?? [];
  }

  /**
   * Converts an array of Workflow domain objects to WorkflowEntity objects
   * @param domains Array of Workflow domain objects
   * @returns Array of WorkflowEntity objects
   */
  static toEntityArray(domains: Workflow[]): WorkflowEntity[] {
    return domains?.map((domain) => this.toEntity(domain)) ?? [];
  }
}
