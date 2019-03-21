import { User } from './user.model';
import { Answer } from './answer.model';
import { Follow } from './follow.model';

export interface Question {
  _id: string;
  asker: User;
  title: string;
  answers: Answer[];
  follows: Follow[];
  tag: string;
  credit: number;
  createdAt: Date;
  updatedAt: Date;
  questionPicture: {
    url: string;
    path: string;
  };
}
