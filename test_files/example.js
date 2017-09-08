class yobit extends Exchange {

    constructor (config={}) {

        super ({

            //...config,

            'id': 'yobit',
            'name': 'YoBit',
            'countries': 'RU',
            'rateLimit': 2000, // responses are cached every 2 seconds
            'version': '3',
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766910-cdcbfdae-5eea-11e7-9859-03fea873272d.jpg',
                'api': 'https://yobit.net',
                'www': 'https://www.yobit.net',
                'doc': 'https://www.yobit.net/en/api/',
            },
            'api': {
                'api': {
                    'get': [
                        'depth/{pairs}',
                        'info',
                        'ticker/{pairs}',
                        'trades/{pairs}',
                    ],
                },
                'tapi': {
                    'post': [
                        'ActiveOrders',
                        'CancelOrder',
                        'GetDepositAddress',
                        'getInfo',
                        'OrderInfo',
                        'Trade',
                        'TradeHistory',
                        'WithdrawCoinsToAddress',
                    ],
                },
            }
        })
    }

    async fetchMarkets () {
        
        let markets = await this.apiGetInfo ();
        let keys = Object.keys (markets['pairs']);
        let result = [];
        for (let p = 0; p < keys.length; p++) {
            let id = keys[p];
            let market = markets['pairs'][id];
            let symbol = id.toUpperCase ().replace ('_', '/');
            let [ base, quote ] = symbol.split ('/');
            base = this.commonCurrencyCode (base);
            quote = this.commonCurrencyCode (quote);
            result.push ({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'info': market,
            });
        }
        return result;
    }
}