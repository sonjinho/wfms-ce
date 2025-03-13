import { WorkflowNodeType } from 'src/workflow-core/domain/workflow-node-type';
import { v4 as uuidv4 } from 'uuid';

export class WorkflowNodeState {
  public readonly id: string;
  public readonly workflowId: string;
  public readonly nodeId: string;
  public readonly nodeType: WorkflowNodeType;
  public readonly value: string;

  /**
   * Creates a new WorkflowNodeState instance
   * @param id Unique identifier for the state
   * @param workflowId Identifier of the associated workflow
   * @param nodeId Identifier of the associated workflow node
   * @param nodeType Type of the workflow node
   * @param value State value
   * @throws Error if required parameters are missing or invalid
   */
  constructor(
    id: string,
    workflowId: string,
    nodeId: string,
    nodeType: WorkflowNodeType,
    value: string,
  ) {
    // Validate required string parameters
    if (!workflowId?.trim()) {
      throw new Error('Workflow ID is required and must be a non-empty string');
    }
    if (!nodeId?.trim()) {
      throw new Error('Node ID is required and must be a non-empty string');
    }

    // Validate nodeType
    if (!Object.values(WorkflowNodeType).includes(nodeType)) {
      throw new Error('Invalid workflow node type');
    }

    // Validate value
    if (value === null || value === undefined) {
      throw new Error('Value is required and cannot be null or undefined');
    }

    this.id = id ?? uuidv4();
    this.workflowId = workflowId;
    this.nodeId = nodeId;
    this.nodeType = nodeType;
    this.value = value;

    // Ensure immutability
    Object.freeze(this);
  }
}
