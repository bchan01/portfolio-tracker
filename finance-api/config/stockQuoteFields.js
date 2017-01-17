// Stock Quote API fields

module.exports = {
    "basic" : {
    	"symbol" : "s",
    	"name" : "n",
    	"exchange" : "x",
    	"lastTradePrice" : "l1",
    	"lastTradeDate" : "d1",
    	"lastTradeTime" : "t1",
    	"change" : "c1",
    	"changePercent" : "p2",
    	"volume" : "v",
    	"averageDailyVolumne" : "a2"
    },
    "movingAverages" : {
        "symbol" : "s",
        "name" : "n",
        "movingAverage50Day" : "m3",
        "movingAverage50DayChange" : "m7",
        "movingAverage50DayChangePercent" : "m8",
        "movingAverage200Day" : "m4",
        "movingAverage200DayChange" : "m5",
        "movingAverage200DayChangePercent" : "m6"
	},
    "estimates" : {
        "symbol" : "s",
        "name" : "n",
        "oneYearTargetPrice" : "t8",
        "currentYearEPSEstimate" : "e7",
        "nextYearEPSEstimate" : "e8",
        "nextQuarterEPSEstimate" : "e9",
        "currentYearPriceToEPSEstimate" : "r6",
        "nextYearPriceToEPSEstimate" : "r7",
        "PEGRatio" : "r5"
    },
    "fundamentals"  : {
        "symbol" : "s",
        "name" : "n",
        "eps" : "e",
        "pe" : "r",
        "dividendPayDate" : "r1",
        "exDividentDate" : "q",
        "dividentPerShare" : "d",
        "dividendYield" : "y",
        "marketCap" : "j1",
        "bookValue" : "b4",
        "priceToBook" : "p6",
        "priceToSales" : "p5",
        "ebitda" : "j4",
        "revenue" : "s6"
    },
    "details" : {
      "symbol" : "s",
      "name" : "n",
      "bid" : "b",
      "bidSize" : "b6",
      "ask" : "a",
      "askSize" : "a5",
      "lastTradeSize" : "k3",
      "floatShares" : "f6",
      "previousClose" : "p",
      "open" : "o",
      "dayRange" : "m",
      "dayHigh" : "h",
      "dayLow" : "g",
      "fiftyTwoWeekRange" : "w",
      "fiftyTwoWeekHigh" : "k",
      "fiftyTwoWeekHighChange" : "k4",
      "fiftyWeekHighChangePercent" : "k5",
      "fiftyTwoWeekLow" : "j",
      "fiftyTwoWeekLowChange" : "j5",
      "fiftyWeekLowChangePercent" : "j6",
      "sharesOutstanding" : "j2",
      "shortRatio" : "s7"
    }
};

