import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateWorkflowCommand } from 'src/workflow/application/ports/in/workflow/update.workflow.command';

export class UpdateWorkflowDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  tags: Map<string, string> = new Map<string, string>();

  toCommand(): UpdateWorkflowCommand {
    return new UpdateWorkflowCommand(this.name, this.tags);
  }
}
