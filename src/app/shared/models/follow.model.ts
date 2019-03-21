import { User } from './user.model';

export interface Follow {
  _id: string;
  follower: User;
  createdAt: Date;
  updatedAt: Date;
}
