import { User } from './user.model';

export class Follow {
  _id: string;
  follower: User;
  createdAt: Date;
  updatedAt: Date;
}
