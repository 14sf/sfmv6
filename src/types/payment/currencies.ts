export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  region: string;
  exchangeRate: number; // Rate against SFM
}

export const EAST_AFRICAN_CURRENCIES: Currency[] = [
  {
    code: 'RWF',
    name: 'Rwandan Franc',
    symbol: 'FRw',
    flag: '🇷🇼',
    region: 'Rwanda',
    exchangeRate: 1430.5864
  },
  {
    code: 'UGX',
    name: 'Ugandan Shilling',
    symbol: 'USh',
    flag: '🇺🇬',
    region: 'Uganda',
    exchangeRate: 4890.3245
  },
  {
    code: 'TZS',
    name: 'Tanzanian Shilling',
    symbol: 'TSh',
    flag: '🇹🇿',
    region: 'Tanzania',
    exchangeRate: 3250.7532
  },
  {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    flag: '🇰🇪',
    region: 'Kenya',
    exchangeRate: 180.4321
  },
  {
    code: 'BIF',
    name: 'Burundian Franc',
    symbol: 'FBu',
    flag: '🇧🇮',
    region: 'Burundi',
    exchangeRate: 2780.1234
  }
];