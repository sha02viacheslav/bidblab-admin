import { User } from './user.model';
import { Follow } from './follow.model';
import { Thumb } from './thumb.model';

export class Question {
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

export class Answer {
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
