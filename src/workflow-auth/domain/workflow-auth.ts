import { WorkflowPermission } from './workflow-permissions';

export class WorkflowAuth {
  public readonly workflowId: number;
  private groupPermissions: Record<string, WorkflowPermission[]>;

  constructor(
    workflowId: number,
    groupPermissions: Record<string, WorkflowPermission[]>,
  ) {
    this.workflowId = workflowId;
    this.groupPermissions = groupPermissions;
  }

  // 그룹에 권한 추가
  public addGroupPermission(
    group: string,
    permissions: WorkflowPermission[],
  ): void {
    if (!this.groupPermissions[group]) {
      this.groupPermissions[group] = [];
    }
    this.groupPermissions[group].push(...permissions);
  }

  // 그룹의 권한 조회
  public getGroupPermissions(group: string): WorkflowPermission[] {
    return this.groupPermissions[group] || [];
  }

  // 그룹의 특정 권한 확인
  public hasGroupPermission(
    group: string,
    permission: WorkflowPermission,
  ): boolean {
    const permissions = this.getGroupPermissions(group);
    return permissions.includes(permission);
  }

  // 모든 그룹의 권한 조회
  public getAllPermissions(): Record<string, WorkflowPermission[]> {
    return this.groupPermissions;
  }
}
