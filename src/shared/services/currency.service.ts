import { inject, injectable } from 'tsyringe';
import { sortBy, uniqBy } from 'lodash';

import { Database } from './rxdb/types';
import { DB_TOKEN } from './rxdb/rxdb.client';

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type Country = {
  currencies: Currency[];
  flag: string;
  name: string;
};

@injectable()
export class CurrencyService {
  private readonly localDbKey = 'currencies';

  constructor(
    @inject(DB_TOKEN)
    private readonly db: Database,
  ) {}

  public async getCurrencies(): Promise<Currency[]> {
    const result = await this.db.getLocal<{ data: Currency[] }>(
      this.localDbKey,
    );

    return result?.get('data') || [];
  }

  public async loadCurrencies(): Promise<Currency[]> {
    const response = await fetch(
      'https://restcountries.eu/rest/v2/all?fields=name;currencies',
    );

    if (!response.ok) {
      throw new Error('Failed to load the currencies.');
    }

    const countries = (await response.json()) as Country[];
    const currencies = this.getCurrenciesFromCountries(countries);

    await this.db.insertLocal(this.localDbKey, {
      data: currencies,
    });

    return currencies;
  }

  private getCurrenciesFromCountries(countries: Country[]): Currency[] {
    const currencies = countries.reduce<Currency[]>(
      (currentCurrencies, country) => [
        ...currentCurrencies,
        ...this.getCurrenciesFromCountry(country),
      ],
      [],
    );

    return sortBy(uniqBy(currencies, 'code'), 'code');
  }

  private getCurrenciesFromCountry(country: Country): Currency[] {
    return country.currencies.reduce<Currency[]>(
      (currentCurrencies, currency) => {
        if (this.skipCurrency(currency)) {
          return currentCurrencies;
        }

        const newCurrency: Currency = {
          ...currency,
        };

        newCurrency.code = this.cleanCurrencyCode(newCurrency.code);

        return [...currentCurrencies, newCurrency];
      },
      [],
    );
  }

  private skipCurrency(currency: Currency): boolean {
    return (
      currency.name?.startsWith?.('[') ||
      !currency.code ||
      currency.code === '(none)'
    );
  }

  private cleanCurrencyCode(code: string): string {
    if (!code.endsWith(']')) {
      return code;
    }

    return code.split('').slice(0, 3).join('');
  }
}
