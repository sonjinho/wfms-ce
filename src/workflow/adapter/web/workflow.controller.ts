import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateWorkflowCommand } from 'src/workflow/application/ports/in/workflow/create.workflow.command';
import { IWorkflowUseCase } from 'src/workflow/application/ports/in/workflow/workflow.usecase';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { WorkflowDTO } from './dto/workflow.dto';

@Controller('workflow')
export class WorkflowController {
  constructor(
    @Inject(IWorkflowUseCase)
    private readonly workflowService: IWorkflowUseCase,
  ) {}

  @Post()
  create(@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowService.create(
      new CreateWorkflowCommand(
        createWorkflowDto.name,
        createWorkflowDto.description,
        createWorkflowDto.tags,
      ),
    );
  }

  @Get()
  findAll() {
    return this.workflowService
      .findAll()
      .then((workflows) =>
        workflows.map((it) => WorkflowDTO.fromDomainModel(it)),
      );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.workflowService
      .findOne(id)
      .then((workflow) => WorkflowDTO.fromDomainModel(workflow));
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    return this.workflowService.update(id, updateWorkflowDto.toCommand());
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.workflowService.remove(id);
  }
}
