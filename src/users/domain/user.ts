import { UserGroup } from './user-group';

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly group: UserGroup[];
}

export class UserDetail {
  public readonly user: User;
  public readonly encryptPwd: string;
  public readonly phoneNumber?: string;
}
