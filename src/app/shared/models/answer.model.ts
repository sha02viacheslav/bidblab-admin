import { User } from './user.model';
import { Thumb } from './thumb.model';

export interface Answer {
  _id: string;
  answerer: User;
  content: string;
  thumbupcnt: number;
  thumbdowncnt: number;
  credit: number;
  answertype: string;
  thumbs: Thumb[];
  createdAt: Date;
  updatedAt: Date;
}
