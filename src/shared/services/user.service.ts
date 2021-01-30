import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { FirebaseService } from 'shared/services/firebase';

import { UserDocument, UserDocType } from './rxdb/schemas';
import { Database } from './rxdb/types';
import { DB_TOKEN } from './rxdb/rxdb.client';

@injectable()
export class UserService {
  constructor(
    @inject(DB_TOKEN)
    private readonly db: Database,
    private readonly firebaseService: FirebaseService,
  ) {}

  public async getUserByAuthId(authId: string): Promise<UserDocument | null> {
    const user = await this.db.user
      .findOne({
        selector: {
          authId,
        },
      })
      .exec();

    return user;
  }

  public async createUser(
    values: Omit<UserDocType, 'id'>,
  ): Promise<UserDocument> {
    const user = await this.db.user.insert({
      ...values,
      id: uuid(),
    });

    return user;
  }

  public async authenticate(): Promise<UserDocument> {
    const firebaseUser = await this.firebaseService.authenticate();

    if (!firebaseUser) {
      throw new Error('Authentication failed.');
    }

    const user = await this.getUserByAuthId(firebaseUser.uid);

    if (!user) {
      throw new Error('User was not found.');
    }

    return user;
  }
}
