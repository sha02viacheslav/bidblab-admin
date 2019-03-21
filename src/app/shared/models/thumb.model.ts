import { User } from './user.model';

export interface Thumb {
  _id: string;
  thumber: User;
  thumbstate: number;
  createdAt: Date;
  updatedAt: Date;
}
