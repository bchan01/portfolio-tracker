var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
  * @SwaggerDefinitions
  *   Holding:
  *     type: object
  *     properties:
  *       symbol:
  *         type: string
  *       description:
  *         type: string
  *       shares:
  *         type: number
  *         format: double
  *       purchasePrice:
  *         type: number
  *         format: double
  *       tradeDate:
  *         type: string
  *         format: date
  *       commission:
  *         type: number
  *         format: double
  */
  var Holding = new Schema({
    symbol : { type: String, required: true },
    description : { type: String, required: true },
    shares : { type: Number, required: true },
    purchasePrice :  { type: Number, required: true },
    tradeDate :  { type: Date, required: true },
    commission : { type: Number, required: true }
});

/**
  * @SwaggerDefinitions
  *   Portfolio:
  *     type: object
  *     properties:
  *       userId:
  *         type: string
  *       name:
  *         type: string
  *       holdings:
  *         type: array
  *         items:
  *           $ref : "#/definitions/Holding"
  */
var PortfolioSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    holdings : [Holding]
}, { collection: 'Portfolio' });

// Unique index
PortfolioSchema.index({ userId: 1, name: 1 }, { unique: true });

PortfolioSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
