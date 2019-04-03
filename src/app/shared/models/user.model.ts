import { Follow } from './follow.model';

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string; 
    email: string;
    aboutme: string;
    phone: string;
    tags: string[];
    follows: Follow[];
    birthday: Date;
    gender: string;
    physicaladdress: string;
    physicalcity: string;
    physicalstate: string;
    physicalzipcode: string;
    shippingaddress: string;
    shippingcity: string;
    shippingstate: string;
    shippingzipcode: string;
    profilePicture: {
      url: string;
      path: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }
  