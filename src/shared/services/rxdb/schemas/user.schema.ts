import { RxDocument, RxCollection, RxJsonSchema } from 'rxdb';

type DocType = {
  id: string;
};

export type UserDocType = DocType & {
  name: string;
  email: string;
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
    name: {
      type: 'string',
    },
    email: {
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
