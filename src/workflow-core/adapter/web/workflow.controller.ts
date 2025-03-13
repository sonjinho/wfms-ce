import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SearchWorkflowQuery } from 'src/workflow-core/application/port/in/search-workflow.query';
import { WorkflowUseCase } from 'src/workflow-core/application/port/in/workflow.usecase';
import { Workflow } from 'src/workflow-core/domain/workflow';

@Controller('workflow')
export class WorkflowController {
  constructor(
    @Inject(WorkflowUseCase)
    private readonly workflowUseCase: WorkflowUseCase,
  ) {}

  @Get()
  findAll(): Promise<Workflow[]> {
    return this.workflowUseCase.search(SearchWorkflowQuery.empty());
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async load(@Param('id') id: string): Promise<Workflow> {
    return await this.workflowUseCase.load(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() workflow: Workflow): Promise<Workflow> {
    return await this.workflowUseCase.create(workflow);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.workflowUseCase.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() workflow: Workflow,
  ): Promise<Workflow> {
    return await this.workflowUseCase.update(id, workflow);
  }
}
