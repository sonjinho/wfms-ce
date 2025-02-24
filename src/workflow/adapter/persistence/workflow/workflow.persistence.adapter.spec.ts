/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { newDb } from 'pg-mem';
import { CreateWorkflowCommand } from 'src/workflow/application/ports/in/workflow/create.workflow.command'; // Adjust the import path
import { UpdateWorkflowCommand } from 'src/workflow/application/ports/in/workflow/update.workflow.command'; // Adjust the import path
import { Repository } from 'typeorm';
import { WorkflowEntity } from './entity/workflow.entity'; // Adjust the import path
import { WorkflowPersistenceAdapter } from './workflow.persistence.adpater';

describe('WorkflowPersistenceAdapter', () => {
  let adapter: WorkflowPersistenceAdapter;
  let workflowRepository: Repository<WorkflowEntity>;

  // Setup pg-mem and TypeORM before each test
  beforeEach(async () => {
    // Create an in-memory PostgreSQL database
    const db = newDb({
      autoCreateForeignKeyIndices: true, // Optional: for foreign key support
    });

    // Register TypeORM-specific functions (e.g., CURRENT_TIMESTAMP)
    db.public.registerFunction({
      name: 'current_timestamp',
      implementation: () => new Date().toISOString(),
    });

    db.public.registerFunction({
      name: 'version',
      implementation: () => 'PostgreSQL 15.0 (pg-mem)',
    });

    // Create the TypeORM connection
    const dataSource = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: [WorkflowEntity],
      synchronize: true, // Automatically create tables
    });

    await dataSource.initialize();

    // Get the repository from the in-memory database
    workflowRepository = dataSource.getRepository(WorkflowEntity);

    // Create the NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkflowPersistenceAdapter,
        {
          provide: getRepositoryToken(WorkflowEntity),
          useValue: workflowRepository,
        },
      ],
    }).compile();

    adapter = module.get<WorkflowPersistenceAdapter>(
      WorkflowPersistenceAdapter,
    );
  });

  afterEach(async () => {
    // Cleanup (destroy the datasource after each test)
    await workflowRepository.manager.connection.destroy();
  });

  describe('findOne', () => {
    it('should return a workflow if it exists', async () => {
      // Arrange: Insert a workflow entity into the in-memory DB
      const entity = workflowRepository.create({
        code: 'WF001',
        name: 'Test Workflow',
        description: 'A test workflow',
        tags: { key: 'value' },
      });
      await workflowRepository.save(entity);

      // Act
      const result = await adapter.findOne(entity.id);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(entity.id);
      expect(result.code).toBe('WF001');
      expect(result.name).toBe('Test Workflow');
    });

    it('should throw an error if workflow is not found', async () => {
      // Act & Assert
      await expect(adapter.findOne(999)).rejects.toThrow('Workflow not found');
    });
  });

  describe('findAll', () => {
    it('should return all workflows', async () => {
      // Arrange
      const entity1 = workflowRepository.create({
        code: 'WF001',
        name: 'Workflow 1',
        description: 'First workflow',
        tags: { key1: 'value1' },
      });
      const entity2 = workflowRepository.create({
        code: 'WF002',
        name: 'Workflow 2',
        description: 'Second workflow',
        tags: { key2: 'value2' },
      });
      await workflowRepository.save([entity1, entity2]);

      // Act
      const result = await adapter.findAll();

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].code).toBe('WF001');
      expect(result[1].code).toBe('WF002');
    });
  });

  describe('create', () => {
    it('should create and return a new workflow', async () => {
      // Arrange
      const command = new CreateWorkflowCommand(
        'WF001',
        'New Workflow',
        'A new workflow',
        new Map([['key', 'value']]),
      );

      // Act
      const result = await adapter.create(command);

      // Assert
      expect(result).toBeDefined();
      expect(result.code).toBe('WF001');
      expect(result.name).toBe('New Workflow');
    });
  });

  describe('update', () => {
    it('should update and return the workflow', async () => {
      // Arrange
      const entity = workflowRepository.create({
        code: 'WF001',
        name: 'Old Workflow',
        description: 'Old description',
        tags: { key: 'value' },
      });
      await workflowRepository.save(entity);

      const command = new UpdateWorkflowCommand(
        'WF001',
        new Map([['newKey', 'newValue']]),
      );

      // Act
      const result = await adapter.update(entity.id, command);

      // Assert
      expect(result).toBeDefined();
      expect(result.name).toBe('Updated Workflow');
      expect(result.description).toBe('Updated description');
    });
  });

  describe('remove', () => {
    it('should remove a workflow', async () => {
      // Arrange
      const entity = workflowRepository.create({
        code: 'WF001',
        name: 'Workflow to delete',
        description: 'To be deleted',
        tags: { key: 'value' },
      });
      await workflowRepository.save(entity);

      // Act
      await adapter.remove(entity.id);

      // Assert
      await expect(adapter.findOne(entity.id)).rejects.toThrow(
        'Workflow not found',
      );
    });

    it('should throw an error if workflow does not exist', async () => {
      // Act & Assert
      await expect(adapter.remove(999)).rejects.toThrow('Workflow not found');
    });
  });
});
