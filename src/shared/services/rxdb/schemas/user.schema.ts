import { RxDocument, RxCollection, RxJsonSchema } from 'rxdb';

type DocType = {
  id: string;
};

type UserDocType = DocType & {
  firstName: string;
  lastName: string;
  authProvider: 'facebook' | 'google';
  authId: string;
};

export type UserDocument = RxDocument<UserDocType>;

export type UserCollection = RxCollection<UserDocType>;

export const userSchema: RxJsonSchema<UserDocType> = {
  version: 0,
  keyCompression: true,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    authProvider: {
      type: 'string',
      enum: ['facebook', 'google'],
    },
    authId: {
      type: 'string',
    },
  },
};
