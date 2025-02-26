export class UserGroup {
  public readonly id?: string;
  public readonly name: string;
  public readonly createdBy: string;
  public readonly deletedBy?: string;
  public readonly description?: string;
  public readonly createdAt: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
