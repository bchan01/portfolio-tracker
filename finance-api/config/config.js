// Server configuration data

module.exports = {
    'baseUri' : '/finance/api',
    'financeAPI' : {
        'requestTimeout' : 10000,
        'quoteUrl' : 'http://finance.yahoo.com/d/quotes.csv',
        'histQuoteUrl' : 'http://ichart.yahoo.com/table.csv',
        'chartUrl' : 'http://chart.finance.yahoo.com/z'
    }

};