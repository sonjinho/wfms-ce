// workflow-permissions.ts
export const WorkflowStepPermission = {
  READ_STEP: 'READ_STEP',
  CONFIRMED_STEP: 'CONFIRMED_STEP',
  ROLLBACK_STEP: 'ROLLBACK_STEP',
  UPDATE_STEP: 'UPDATE_STEP',
  CANCELLED_STEP: 'CANCELLED_STEP',
} as const;

export type WorkflowStepPermission = keyof typeof WorkflowStepPermission;
