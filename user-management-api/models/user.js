var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
  * @SwaggerDefinitions
  *   User:
  *     type: object
  *     properties:
  *       username:
  *         type: string
  *       userPassword:
  *         type: string
  *       firstName:
  *         type: string
  *       lastName:
  *         type: string
  *       middleName:
  *         type: string
  *       email:
  *         type: string
  *       addressLine1:
  *         type: string
  *       addressLine2:
  *         type: string
  *       city:
  *         type: string
  *       state:
  *         type: string
  *       postalCode:
  *         type: string
  *       homePhone:
  *         type: string
  *       workPhone:
  *         type: string
  *       mobilePhone:
  *         type: string
  */
var UserSchema = new Schema({
    username: { type: String, required: true , index: { unique: true }},
    userPassword: { type: String},
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    email: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    homePhone : {type : String},
    workPhone : { type : String},
    mobilePhone : {type : String}

}, { collection: 'User' });

UserSchema.virtual('fullName').get(function () { return this.firstName + ' ' + this.lastName; });

UserSchema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('User', UserSchema);