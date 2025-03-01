import { ProjectStep } from 'src/project/domain/project-step';
import { SubmitProjectStepCommand } from './command/submit-project-step.command';

export interface ProjectStepUseCase {
  load(projectStepId: string): Promise<ProjectStep>;
  update(projectStepId: string, inputs: Map<string, any>): Promise<ProjectStep>;
  submit(command: SubmitProjectStepCommand): Promise<ProjectStep>;
}

export const ProjectStepUseCase = Symbol('ProjectStepUseCase');
