import { WorkflowStepPermission } from './workflow-step-permissions';

export class WorkflowStepAuth {
  public readonly workflowStepId: number;
  private groupPermissions: Record<string, WorkflowStepPermission[]>;

  constructor(workflowStepId: number) {
    this.workflowStepId = workflowStepId;
    this.groupPermissions = {};
  }

  public addGroupPermission(
    group: string,
    permissions: WorkflowStepPermission[],
  ): void {
    if (!this.groupPermissions[group]) {
      this.groupPermissions[group] = [];
    }
    this.groupPermissions[group].push(...permissions);
  }

  // 그룹의 권한 조회
  public getGroupPermissions(group: string): WorkflowStepPermission[] {
    return this.groupPermissions[group] || [];
  }

  // 그룹의 특정 권한 확인
  public hasGroupPermission(
    group: string,
    permission: WorkflowStepPermission,
  ): boolean {
    const permissions = this.getGroupPermissions(group);
    return permissions.includes(permission);
  }

  // 모든 그룹의 권한 조회
  public getAllPermissions(): Record<string, WorkflowStepPermission[]> {
    return this.groupPermissions;
  }
}
