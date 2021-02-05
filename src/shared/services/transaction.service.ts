import { BehaviorSubject } from 'rxjs';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { random } from 'lodash';

import { TransactionDocType, TransactionDocument } from './rxdb/schemas';
import { Database } from './rxdb/types';
import { DB_TOKEN } from './rxdb/rxdb.client';

@injectable()
export class TransactionService {
  constructor(
    @inject(DB_TOKEN)
    private readonly db: Database,
  ) {}

  public async seed(): Promise<TransactionDocument[]> {
    const transactions: TransactionDocType[] = Array.from({
      length: 10000,
    }).map(() => {
      const createdAt = random(
        new Date('2020-01-01').getTime(),
        new Date().getTime(),
      );

      return {
        id: uuid(),
        amount: Number(random(500, 10000, true).toFixed(2)),
        description: 'Just some seed data',
        createdAt,
      };
    });

    const { success, error } = await this.db.transaction.bulkInsert(
      transactions,
    );

    if (error.length) {
      throw new Error(JSON.stringify(error));
    }

    return success;
  }

  public async list(): Promise<TransactionDocument[]> {
    return this.db.transaction
      .find()
      .sort({
        createdAt: 'desc',
      })
      .exec();
  }

  public listSub(): BehaviorSubject<TransactionDocument[]> {
    return this.db.transaction.find().sort({ createdAt: 'desc' }).$;
  }

  public async add(createdAt: number): Promise<void> {
    await this.db.transaction.insert({
      id: uuid(),
      amount: Number(random(500, 10000, true).toFixed(2)),
      description: 'Just some seed data',
      createdAt,
    });
  }
}
