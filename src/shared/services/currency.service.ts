import LocalForage from 'localforage';
import { container, inject, injectable } from 'tsyringe';
import { uniqBy } from 'lodash';

import { LOCAL_DB_TOKEN } from './localforage';

type Currency = {
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
    @inject(LOCAL_DB_TOKEN)
    private readonly localDb: LocalForage,
  ) {}

  public static getInstance(): CurrencyService {
    return container.resolve(CurrencyService);
  }

  public async loadCurrencies(): Promise<Currency[]> {
    const response = await fetch(
      'https://restcountries.eu/rest/v2/all?fields=name;currencies;flag',
    );

    if (!response.ok) {
      throw new Error('Failed to load the currencies.');
    }

    const countries = (await response.json()) as Country[];
    const currencies = this.getCurrenciesFromCountries(countries);

    await this.localDb.setItem(this.localDbKey, currencies);

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

    return uniqBy(currencies, 'code');
  }

  private getCurrenciesFromCountry(country: Country): Currency[] {
    return country.currencies.reduce<Currency[]>(
      (currentCurrencies, currency) => {
        if (currency.name?.startsWith?.('[')) {
          return currentCurrencies;
        }

        const newCurrency: Currency = {
          ...currency,
          code: currency.code === '(none)' ? '' : currency.code,
        };

        return [...currentCurrencies, newCurrency];
      },
      [],
    );
  }
}
