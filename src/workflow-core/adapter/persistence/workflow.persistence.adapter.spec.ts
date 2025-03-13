/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workflow } from 'src/workflow-core/domain/workflow';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { MapperWorkflow } from './entity/mapper/mapper.workflow';
import { WorkflowEntity } from './entity/workflow.entity';
import { WorkflowPersistenceAdapter } from './workflow.persistence.adapter';

describe('WorkflowPersistenceAdapter', () => {
  let adapter: WorkflowPersistenceAdapter;
  let workflowRepository: Repository<WorkflowEntity>;
  const mockWorkflowRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const randUUID = v4();
  const mockWorkflow = new Workflow('workflow', '', [], randUUID);
  const mockWorkflowEntity = {
    id: randUUID,
    name: 'workflow',
    description: '',
    nodes: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2025-01-01'),
    deletedAt: null,
  } as unknown as WorkflowEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkflowPersistenceAdapter,
        {
          provide: getRepositoryToken(WorkflowEntity),
          useValue: mockWorkflowRepository,
        },
      ],
    }).compile();

    adapter = module.get<WorkflowPersistenceAdapter>(
      WorkflowPersistenceAdapter,
    );
    workflowRepository = module.get<Repository<WorkflowEntity>>(
      getRepositoryToken(WorkflowEntity),
    );
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('load', () => {
    it('should load a workflow by id', async () => {
      mockWorkflowRepository.findOne.mockResolvedValue(mockWorkflowEntity);
      jest.spyOn(MapperWorkflow, 'toDomain').mockReturnValue(mockWorkflow);
      const result = await adapter.load(randUUID);
      expect(workflowRepository.findOne).toHaveBeenCalledWith({
        where: { id: randUUID },
        relations: ['nodes'],
      });
      expect(MapperWorkflow.toDomain).toHaveBeenCalledWith(mockWorkflowEntity);
      expect(result).toEqual(mockWorkflow);
    });
  });

  it('should load a workflow', async () => {
    const workflowEntity = new WorkflowEntity();
    workflowEntity.id = '1';
    mockWorkflowRepository.findOne.mockResolvedValue(workflowEntity);
    const result = await adapter.load('1');
    expect(result).toBeInstanceOf(Workflow);
    expect(mockWorkflowRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['nodes'],
    });
  });

  it('should create a workflow', async () => {
    const workflow = new Workflow('1', 'test', []);
    const workflowEntity = new WorkflowEntity();
    workflowEntity.id = '1';
    mockWorkflowRepository.save.mockResolvedValue(workflowEntity);
    const result = await adapter.create(workflow);
    expect(result).toBeInstanceOf(Workflow);
    expect(mockWorkflowRepository.save).toHaveBeenCalled();
  });

  it('should delete a workflow', async () => {
    mockWorkflowRepository.delete.mockResolvedValue({ affected: 1 });
    const result = await adapter.delete('1');
    expect(result).toBe(true);
    expect(mockWorkflowRepository.delete).toHaveBeenCalledWith('1');
  });
});
