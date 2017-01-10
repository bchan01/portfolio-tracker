// Server configuration data

module.exports = {
    'baseUri' : '/finance/api',
    'financeAPI' : {
        'requestTimeout' : 10000,
        'quoteUrl' : 'http://finance.yahoo.com/d/quotes.csv',
        'histQuoteUrl' : 'http://ichart.yahoo.com/table.csv',
        'chartUrl' : 'http://chart.finance.yahoo.com/z',
        'quoteFields' : {
            'keys' : 'snl1d1t1baopc1p2hgkjv',
            'names' : 'symbol,name,price,date,time,bid,ask,open,previousClose,change,changePercent,daysHigh,daysLow,high52Weeks,low52Weeks,volume'
        },
        'symbolLookupUrl' : 'http://d.yimg.com/aq/autoc?region=US&lang=en-US'
    }

};