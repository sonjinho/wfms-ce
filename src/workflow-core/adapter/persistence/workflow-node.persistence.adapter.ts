import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowNodePort } from 'src/workflow-core/application/port/out/workflow-node.port';
import { WorkflowNode } from 'src/workflow-core/domain/workflow-node';
import { WorkflowNodeType } from 'src/workflow-core/domain/workflow-node-type';
import { Repository } from 'typeorm';
import { MapperWorkflowNode } from './entity/mapper/mapper.workflow-node';
import { WorkflowNodeEntity } from './entity/workflow-node.entity';

@Injectable()
export class WorkflowNodePersistenceAdapter implements WorkflowNodePort {
  constructor(
    @InjectRepository(WorkflowNodeEntity)
    private readonly workflowNodeRepository: Repository<WorkflowNodeEntity>,
  ) {}
  async loadByType(
    id: string,
    nodeType: WorkflowNodeType,
  ): Promise<WorkflowNode> {
    const entity = await this.workflowNodeRepository.findOne({
      where: {
        id: id,
        nodeType: nodeType,
      },
    });
    if (!entity) throw new Error('WorkflowNode not found');

    return MapperWorkflowNode.toDomain(entity);
  }
  async loadByWorkflow(workflowId: string): Promise<WorkflowNode[]> {
    const entities = await this.workflowNodeRepository.find({
      where: {
        workflow: {
          id: workflowId,
        },
      },
      relations: ['states', 'connections'],
    });
    return entities.map((entity) => MapperWorkflowNode.toDomain(entity));
  }
  async load(id: string): Promise<WorkflowNode> {
    const entity = await this.workflowNodeRepository.findOne({
      where: { id: id },
      relations: ['states'],
    });
    if (!entity) throw new Error('WorkflowNode not found');
    return MapperWorkflowNode.toDomain(entity);
  }
  async create(node: WorkflowNode): Promise<WorkflowNode> {
    const entity = MapperWorkflowNode.toEntity(node);
    return this.workflowNodeRepository.save(entity).then((res) => {
      return MapperWorkflowNode.toDomain(res);
    });
  }
  async update(id: string, node: WorkflowNode): Promise<WorkflowNode> {
    const entity = MapperWorkflowNode.toEntity(node);
    entity.id = id;
    return this.workflowNodeRepository.save(entity).then((res) => {
      return MapperWorkflowNode.toDomain(res);
    });
  }
  async delete(id: string): Promise<boolean> {
    return this.workflowNodeRepository.delete(id).then((res) => {
      return (res.affected ?? 0) > 0;
    });
  }
}
