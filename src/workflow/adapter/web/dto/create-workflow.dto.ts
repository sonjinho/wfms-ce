import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  description: string;
  @IsOptional()
  tags: Map<string, string> = new Map<string, string>();
}
