import { v4 as uuidv4 } from 'uuid';
import { WorkflowNode } from './workflow-node';
export class Workflow {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly nodes: WorkflowNode[];
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;

  /**
   * Creates a new Workflow instance
   * @param name The name of the workflow
   * @param description A description of the workflow
   * @param nodes Array of workflow nodes
   * @param id Optional unique identifier
   * @param createdAt Optional creation date
   * @param updatedAt Optional last update date
   * @param deletedAt Optional deletion date
   * @throws Error if required parameters are invalid
   */
  constructor(
    name: string,
    description: string,
    nodes: WorkflowNode[],
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    // Validate required parameters
    if (!name?.trim()) {
      throw new Error(
        'Workflow name is required and must be a non-empty string',
      );
    }
    if (description === null || description === undefined) {
      throw new Error(
        'Workflow description is required and cannot be null or undefined',
      );
    }
    if (!Array.isArray(nodes)) {
      throw new Error('Nodes must be an array of WorkflowNode objects');
    }
    if (nodes.some((node) => !(node instanceof WorkflowNode))) {
      throw new Error('All nodes must be instances of WorkflowNode');
    }

    // Validate optional date parameters
    if (createdAt && !(createdAt instanceof Date)) {
      throw new Error('createdAt must be a Date object if provided');
    }
    if (updatedAt && !(updatedAt instanceof Date)) {
      throw new Error('updatedAt must be a Date object if provided');
    }
    if (deletedAt && !(deletedAt instanceof Date)) {
      throw new Error('deletedAt must be a Date object if provided');
    }

    this.id = id ?? uuidv4();
    this.name = name;
    this.description = description;
    this.nodes = [...nodes]; // Create a defensive copy
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;

    // Ensure immutability
    Object.freeze(this);
    Object.freeze(this.nodes);
  }

  /**
   * Creates a new Workflow instance from partial data
   * @param data Partial workflow data
   * @returns New Workflow instance
   */
  static fromPartial(data: Partial<Workflow>): Workflow {
    return new Workflow(
      data.name ?? '',
      data.description ?? '',
      data.nodes ?? [],
      data.id,
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  /**
   * Checks if the workflow is deleted
   * @returns True if the workflow has a deletion date
   */
  isDeleted(): boolean {
    return !!this.deletedAt;
  }

  /**
   * Gets a node by its ID
   * @param nodeId The ID of the node to find
   * @returns The matching WorkflowNode or undefined if not found
   */
  getNodeById(nodeId: string): WorkflowNode | undefined {
    if (!nodeId?.trim()) {
      throw new Error('Node ID is required');
    }
    return this.nodes.find((node) => node.id === nodeId);
  }

  /**
   * Creates a new instance with updated properties
   * @param updates Partial updates to apply
   * @returns New Workflow instance with updated properties
   */
  with(updates: Partial<Workflow>): Workflow {
    return new Workflow(
      updates.name ?? this.name,
      updates.description ?? this.description,
      updates.nodes ?? this.nodes,
      updates.id ?? this.id,
      updates.createdAt ?? this.createdAt,
      updates.updatedAt ?? this.updatedAt,
      updates.deletedAt ?? this.deletedAt,
    );
  }

  /**
   * Creates a copy marked as deleted
   * @param deletedAt Optional deletion timestamp (defaults to now)
   * @returns New Workflow instance marked as deleted
   */
  markAsDeleted(deletedAt: Date = new Date()): Workflow {
    if (!(deletedAt instanceof Date)) {
      throw new Error('deletedAt must be a Date object');
    }
    return this.with({ deletedAt });
  }
}
