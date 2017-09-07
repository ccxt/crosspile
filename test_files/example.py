class yobit (Exchange):

    def __init__(self, config={}):
        params = {
            'id': 'yobit',
            'name': 'YoBit',
            'countries': 'RU',
            'rateLimit': 2000, # responses are cached every 2 seconds
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
            },
        }
        params.update(config)
        super(yobit, self).__init__(params)

    def fetch_markets(self):
        markets = self.apiGetInfo()
        keys = list(markets['pairs'].keys())
        result = []
        for p in range(0, len(keys)):
            id = keys[p]
            market = markets['pairs'][id]
            symbol = id.upper().replace('_', '/')
            base, quote = symbol.split('/')
            base = self.commonCurrencyCode(base)
            quote = self.commonCurrencyCode(quote)
            result.append({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'info': market,
            })
        return result
