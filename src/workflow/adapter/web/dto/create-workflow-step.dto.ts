import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkflowStepDTO {
  @IsNotEmpty()
  workflowId: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
}
