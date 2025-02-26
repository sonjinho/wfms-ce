// workflow-permissions.ts
export const WorkflowPermissions = {
  CREATE_PROJECT: 'CREATE_PROJECT',
  READ_PROJECT: 'READ_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
} as const;

export type WorkflowPermission = keyof typeof WorkflowPermissions;
