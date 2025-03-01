import { Project } from 'src/project/domain/project';
import { CreateProjectCommand } from './command/create-project.command';
import { UpdateProjectCommand } from './command/update-project.command';
import { SearchProjectQuery } from './query/search-project.query';

export interface ProjectUseCase {
  create(command: CreateProjectCommand): Promise<Project>;
  update(command: UpdateProjectCommand): Promise<Project>;
  remove(projectId: string): Promise<Project>;
  search(query: SearchProjectQuery): Promise<Project[]>;
  load(projectId: string): Promise<Project>;
}

export const ProjectUseCase = Symbol('ProjectUseCase');
